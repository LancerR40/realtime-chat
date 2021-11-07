import User from '../models/User';
import cloudinary from '../utils/cloudinary';

class AuthService {
  signup = async (newUser) => {
    try {
      const uploaded = await cloudinary.uploader.upload(newUser.userAvatar, {
        folder: 'mern-chat-app/avatars',
      });

      newUser.userAvatar = uploaded.secure_url;

      const user = new User(newUser);
      await user.save();

      return { success: true, msg: 'Successfully registered user!' };
    } catch (error) {
      return { success: false, error };
    }
  };

  login = async (userEmail) => {
    try {
      const findUser = await User.findOne({ userEmail: userEmail });

      if (findUser === null) {
        return { success: false, msg: 'Invalid credentials' };
      }

      const { _id: IDUser, userPassword } = findUser;

      return { success: true, user: { IDUser, userPassword } };
    } catch (error) {
      return { success: false, error };
    }
  };

  verifyEmail = async (userEmail) => {
    try {
      const findEmail = await User.findOne({ userEmail });

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
