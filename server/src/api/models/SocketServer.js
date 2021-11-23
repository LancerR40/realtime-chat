import User from './User';
import { verifyJWT } from '../utils/jsonwebtoken';

class SocketServer {
  constructor(io) {
    this.io = io;

    // Connections
    this.users = new Map();

    this.socketEvents();
  }

  isAuthMiddleware(socket, next) {
    const { query } = socket.handshake;

    if (!query) {
      throw new Error('Error');
    }

    if (!query.token) {
      throw new Error('Error');
    }

    try {
      const payload = verifyJWT(query.token);
      socket.userId = payload.id;

      next();
    } catch (error) {
      throw new Error('Error');
    }
  }

  socketEvents() {
    this.io.use(this.isAuthMiddleware);

    this.io.on('connection', async (socket) => {
      // Find user data
      const { userId, id } = socket;
      const user = await User.findOne({ _id: userId });
      const { fullname, email, avatar } = user;

      // Add user connection, (user id - socket id)
      this.users.set(id, {
        socketId: id,
        userId: userId,
        fullname,
        email,
        avatar,
      });

      // Emit connected users
      const connectedContacts = [];

      for (let x = 0; x < user.contacts.length; x++) {
        const { _id: id } = user.contacts[x];

        this.users.forEach(({ userId }) => {
          if (String(id) === userId) {
            connectedContacts.push({ id: userId, status: true });
          }
        });
      }

      if (connectedContacts.length > 0) {
        this.io
          .to(id)
          .emit('chat:connected_users', { connectedUsers: connectedContacts });
      }

      socket.on('chat:msg', (data) => {
        // Outgoing user data
        const { userId, fullname, email, avatar } = this.users.get(id);

        const newMsg = {
          outgoingUser: {
            id: userId,
            fullname,
            email,
            avatar,
          },
          incomingUser: {
            id: data.incomingUserId,
          },
          content: data.msg,
          datetime: new Date().getTime(),
        };

        this.users.forEach((element) => {
          if (element.userId === data.incomingUserId) {
            return socket.to(element.socketId).emit('chat:msg', newMsg);
          }
        });
      });

      socket.on('chat:logout', () => this.users.delete(id));

      socket.on('disconnect', () => this.users.delete(id));
    });
  }
}

export default SocketServer;
