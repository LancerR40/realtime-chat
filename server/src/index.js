import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';

dotenv.config();

// From config
require('./api/config/connection');
require('./api/config/cloudinary');

const app = express();
const port = process.env.SERVER_PORT || 4000;

import authRoutes from './api/routes/auth';
import chatRoutes from './api/routes/chat';

// Middlewares
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

app.listen(port, () => console.log('Server on port: ' + port));
