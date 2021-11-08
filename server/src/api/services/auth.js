import User from '../models/User';
import mongoose, { Mongoose, Schema } from 'mongoose';

class AuthService {
  signup = async (newUser, cloudinary) => {
    try {
      const uploaded = await cloudinary.uploader.upload(newUser.avatar, {
        folder: 'mern-chat-app/avatars',
      });

      newUser.avatar = uploaded.secure_url;

      const user = new User(newUser);
      await user.save();

      return { success: true, msg: 'Successfully registered user!' };
    } catch (error) {
      return { success: false, error };
    }
  };

  login = async (email) => {
    try {
      const findUser = await User.findOne({ email });

      if (findUser === null) {
        return { success: false, msg: 'Invalid credentials' };
      }

      const { _id: id, password } = findUser;

      return { success: true, user: { id, password } };
    } catch (error) {
      return { success: false, error };
    }
  };

  verifyEmail = async (email) => {
    try {
      const findEmail = await User.findOne({ email });

      if (findEmail !== null) {
        return { success: false, msg: 'User already exists' };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };
}

export default AuthService;
