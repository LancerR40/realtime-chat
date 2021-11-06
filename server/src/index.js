import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';

dotenv.config();

// Db connection
require('./db/connection');

// Import routes
import authRoutes from './api/routes/auth';

const app = express();
const port = process.env.SERVER_PORT || 4000;

// Middlewares
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

// Routes
app.use('/api/auth', authRoutes);

app.listen(port, () => console.log('Server on port: ' + port));
