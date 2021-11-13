import User from '../models/User';

class AuthService {
  signup = async (newUser, cloudinary) => {
    try {
      console.log(newUser.email);
      const findUser = await User.findOne({ email: newUser.email });
      if (findUser) {
        console.log('Usuario registrado');
        return { success: false, isUserExist: true };
      }

      const uploaded = await cloudinary.uploader.upload(newUser.avatar, {
        folder: 'mern-chat-app/avatars',
      });

      newUser.avatar = uploaded.secure_url;

      const user = new User(newUser);
      await user.save();

      console.log('Registrado');

      return { success: true };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error,
      };
    }
  };

  login = async (email) => {
    try {
      const findUser = await User.findOne({ email });

      if (!findUser) {
        return { success: false, userFound: false };
      }

      const { _id: id, password } = findUser;

      return { success: true, userFound: true, data: { id, password } };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  };
}

export default AuthService;
