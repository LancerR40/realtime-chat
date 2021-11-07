import bcrypt from 'bcrypt';

export const encryptPassword = async (plaintextPassword) =>
  await bcrypt.hash(plaintextPassword, 10);

export const decryptPassword = async (plaintextPassword, hash) =>
  await bcrypt.compare(plaintextPassword, hash);
