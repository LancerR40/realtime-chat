import bcrypt from 'bcrypt';

export const encryptPassword = async (plaintextPassword) =>
  await bcrypt.hash(plaintextPassword, 10);
