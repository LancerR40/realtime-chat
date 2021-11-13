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

  const newUser = {
    fullname,
    email,
    password: await encryptPassword(password),
    avatar: toBase64(avatar),
  };

  const auth = new AuthService();
  const response = await auth.signup(newUser, cloudinary);
  const { success, isUserExist } = response;

  if (isUserExist) {
    res.status(200).json({ success, msg: 'User already exists' });
  }

  if (success === true) {
    res.status(200).json({ success, msg: 'Successfully registered user!' });
  }
};

export const loginController = async (req, res) => {
  const { email, password: textPlainPassword } = req.body;

  const auth = new AuthService();
  const response = await auth.login(email);
  const { success, userFound, data } = response;

  if (!userFound) {
    return res.status(200).json({ success, msg: 'Invalid credentials' });
  }

  const { id, password: hash } = data;

  const isTruePassword = await decryptPassword(textPlainPassword, hash);

  if (!isTruePassword) {
    return res.status(200).json({ success: false, msg: 'Invalid credentials' });
  }

  const token = createJWT(id);

  res
    .status(200)
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
