import jwt from 'jsonwebtoken';
require('dotenv').config();

export const createJWT = (IDUser) =>
  jwt.sign({ IDUser }, process.env.JWT_SECRET, {
    expiresIn: '2h',
  });
