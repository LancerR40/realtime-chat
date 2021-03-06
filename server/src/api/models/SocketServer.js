import User from './User';
import { verifyJWT } from '../utils/jsonwebtoken';

import AuthService from '../services/auth';

class SocketServer {
  constructor(io) {
    this.io = io;

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

  findUser = async (userId) => {
    const userProps = await User.findOne({ _id: userId });
    const { fullname, email, avatar } = userProps;

    return { fullname, email, avatar };
  };

  connectUser = async (socket) => {
    try {
      const { userId, id: socketId } = socket;

      const user = await this.findUser(userId);
      const newUser = {
        socketId,
        userId,
        ...user,
      };

      // Update db user connection prop to true
      await User.updateOne({ _id: userId }, { $set: { isConnected: true } });

      socket.broadcast.emit('chat:user-online', { userId, isConnected: true });

      this.users.set(socketId, newUser);
    } catch (error) {
      // code...
      console.log(error);
    }
  };

  getUserBySocketId = (socket) => {
    const { id: socketId } = socket;

    return this.users.get(socketId);
  };

  sendMessage = (message, socket) => {
    const { userId, fullname, email, avatar } = this.getUserBySocketId(socket);
    const { incomingUserId, messageContent } = message;

    const outgoingUser = {
      id: userId,
      fullname,
      email,
      avatar,
    };

    const data = {
      message: {
        outgoingUserId: outgoingUser.id,
        incomingUserId,
        content: messageContent,
        datetime: new Date().getTime(),
      },
      outgoingUser,
      incomingUser: incomingUserId,
    };

    this.users.forEach(({ userId, socketId }) => {
      if (userId === incomingUserId) {
        return socket.to(socketId).emit('chat:message', data);
      }
    });
  };

  disconnectUser = async (socket) => {
    try {
      const authService = new AuthService();
      await authService.logout(socket.userId);

      this.users.delete(socket.id);

      socket.broadcast.emit('chat:user-offline', {
        userId: socket.userId,
        isConnected: false,
      });
    } catch (error) {
      // code...
    }
  };

  socketEvents() {
    this.io.use(this.isAuthMiddleware);

    this.io.on('connection', async (socket) => {
      await this.connectUser(socket);

      socket.on('chat:message', (message) => this.sendMessage(message, socket));

      socket.on('chat:logout', () => this.disconnectUser(socket));

      socket.on('disconnect', () => this.disconnectUser(socket));
    });
  }
}

export default SocketServer;
