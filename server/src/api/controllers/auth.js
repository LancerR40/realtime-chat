import AuthService from '../services/auth';

import { encryptPassword, decryptPassword } from '../utils/bcrypt';
import { createJWT, verifyJWT } from '../utils/jsonwebtoken';
import cloudinary from '../config/cloudinary';
import toBase64 from '../utils/toBase64';

export const authVerifyController = async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(200).json({ success: true, auth: false });
  }

  if (token) {
    try {
      verifyJWT(token);

      res.status(200).json({ success: true, auth: true });
    } catch (error) {
      res.json({ success: false, auth: false, msg: 'Authentication failed' });
    }
  }
};

export const signupController = async (req, res) => {
  const { fullname, email, password } = req.body;
  const { avatar } = req.files;

  const auth = new AuthService();

  const isUserExist = await auth.verifyEmail(email);
  const { success, msg, error } = isUserExist;

  if (success === false && error) {
    return console.log(error);
  }

  if (success === false) {
    return res.status(200).json({ success, msg });
  }

  const newUser = {
    fullname,
    email,
    password: await encryptPassword(password),
    avatar: toBase64(avatar),
  };

  const response = await auth.signup(newUser, cloudinary);

  if (response.success === false && response.error) {
    return console.log(error);
  }

  res.status(200).json(response);
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const auth = new AuthService();
  const response = await auth.login(email);
  const { success, msg, user, error } = response;

  if (success === false && error) {
    return console.log(error);
  }

  if (success === false && msg) {
    return res.status(200).json({ success: false, msg });
  }

  const comparePassword = await decryptPassword(password, user.password);

  if (comparePassword !== true) {
    return res.status(200).json({ success: false, msg: 'Invalid credentials' });
  }

  const token = createJWT(user.id);

  res
    .cookie('token', token, {
      httpOnly: true,
    })
    .json({ success: true, auth: true });
};

export const logoutController = (_req, res) => {
  try {
    res.status(200).clearCookie('token').json({ success: true, auth: false });
  } catch (error) {
    console.log(error);
  }
};
