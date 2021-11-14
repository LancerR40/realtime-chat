import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';

import http from 'http';
import io from 'socket.io';

import authRoutes from '../routes/auth';
import chatRoutes from '../routes/chat';

import SocketServer from './SocketServer';

class Server {
  constructor() {
    this.dotenv = dotenv.config();

    this.app = express();
    this.port = process.env.SERVER_PORT;

    // HTTP server
    this.server = http.createServer(this.app);

    // Socket server
    this.io = io(this.server, {
      // transport: ['websocket'],
      cors: {
        origin: 'http://localhost:3000',
      },
    });

    // Global settings
    this.db = require('../config/db');
    this.cloudinary = require('../config/cloudinary');
  }

  routes() {
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/chat', chatRoutes);
  }

  middlewares() {
    this.app.use(
      cors({
        origin: 'http://localhost:3000',
        credentials: true,
      })
    );
    this.app.use(cookieParser());
    this.app.use(morgan('dev'));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(fileUpload());
  }

  socketServer() {
    new SocketServer(this.io);
  }

  execute() {
    this.middlewares();

    this.routes();

    this.socketServer();

    this.server.listen(this.port, () =>
      console.log('Server on port: ' + this.port)
    );
  }
}

export default Server;
