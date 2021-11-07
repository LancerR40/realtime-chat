import AuthService from '../services/auth';

import { encryptPassword, decryptPassword } from '../utils/bcrypt';
import { createJWT } from '../utils/jsonwebtoken';
import toBase64 from '../utils/toBase64';

export const signupController = async (req, res) => {
  const { userFullname, userEmail, userPassword } = req.body;
  const { userAvatar } = req.files;

  const auth = new AuthService();

  const isUserExist = await auth.verifyEmail(userEmail);
  const { success, msg, error } = isUserExist;

  if (success === false && error) {
    return console.log(error);
  }

  if (success === false) {
    return res.status(200).json({ success, msg });
  }

  const newUser = {
    userFullname,
    userEmail,
    userPassword: await encryptPassword(userPassword),
    userAvatar: toBase64(userAvatar),
  };

  const response = await auth.signup(newUser);

  if (response.success === false && response.error) {
    return console.log(error);
  }

  res.status(200).json(response);
  res.end();
};

export const loginController = async (req, res) => {
  const { userEmail, userPassword } = req.body;

  const auth = new AuthService();
  const response = await auth.login(userEmail);
  const { success, msg, user, error } = response;

  if (success === false && error) {
    return console.log(error);
  }

  if (success === false && msg) {
    return res.status(200).json({ success: false, msg });
  }

  const comparePassword = await decryptPassword(
    userPassword,
    user.userPassword
  );

  if (comparePassword !== true) {
    return res.status(200).json({ success: false, msg: 'Invalid credentials' });
  }

  const token = createJWT({ IDUser: user.IDUser });

  res
    .cookie('token', token, {
      httpOnly: true,
    })
    .json({ success: true, auth: true });
};
