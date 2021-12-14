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

      socket.on('chat:msg', (data) => {
        // Get outgoing user data
        const { userId, fullname, email, avatar } = this.users.get(id);

        const outgoingUser = {
          id: userId,
          fullname,
          email,
          avatar,
        };

        const incomingUser = {
          id: data.incomingUserId,
        };

        const newMessage = {
          outgoingUser,
          incomingUser,
          content: data.messageContent,
          datetime: new Date().getTime(),
        };

        this.users.forEach((user) => {
          if (user.userId === data.incomingUserId) {
            return socket.to(user.socketId).emit('chat:msg', newMessage);
          }
        });
      });

      socket.on('chat:logout', () => {
        this.users.delete(id);
      });

      socket.on('disconnect', () => {
        this.users.delete(id);
      });
    });
  }
}

export default SocketServer;
