import jwt from 'jsonwebtoken';
require('dotenv').config();

export const createJWT = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '5h',
  });

export const verifyJWT = (token) => jwt.verify(token, process.env.JWT_SECRET);
