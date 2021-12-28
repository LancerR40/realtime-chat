import User from '../models/User';

import cloudinary from '../config/cloudinary';
import toBase64 from '../utils/toBase64';
import { createJWT, verifyJWT } from '../utils/jsonwebtoken';
import { encryptPassword, decryptPassword } from '../utils/bcrypt';
import toObjectId from '../utils/toObjectId';

class AuthService {
  isAuth = (token) => {
    const payload = verifyJWT(token);

    if (payload) {
      return { status: true };
    }
  };

  signup = async (newUser) => {
    const isUserExist = await User.findOne({ email: newUser.email });

    if (isUserExist) {
      return { isUserExist: true };
    }

    const uploaded = await cloudinary.uploader.upload(
      toBase64(newUser.avatar),
      {
        folder: 'mern-chat-app/avatars',
      }
    );

    newUser.password = await encryptPassword(newUser.password);
    newUser.avatar = uploaded.secure_url;

    const user = new User(newUser);
    await user.save();

    return { status: true };
  };

  login = async (user) => {
    const isUserExist = await User.findOne({ email: user.email });

    if (!isUserExist) {
      return { error: 'Invalid credentials' };
    }

    if (isUserExist.isConnected) {
      return { error: 'The user is connected' };
    }

    const comparePassword = await decryptPassword(
      user.password,
      isUserExist.password
    );

    if (comparePassword !== true) {
      return { error: 'Invalid credentials' };
    }

    const token = createJWT(isUserExist._id);

    isUserExist.isConnected = true;

    await User.updateOne(
      { _id: isUserExist._id },
      { $set: { isConnected: true } }
    );

    return { token };
  };

  logout = async (token) => {
    const payload = verifyJWT(token);
    const userId = toObjectId(payload.id);

    await User.updateOne({ _id: userId }, { $set: { isConnected: false } });
  };
}

export default AuthService;
