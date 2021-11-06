import cloudinary from '../utils/cloudinary';
import UserModel from '../models/signup';
import { imageToBase64 } from '../utils/toBase64';

export const signupService = async (data) => {
  const base64Image = imageToBase64(data.userAvatar);

  try {
    const uploaded = await cloudinary.uploader.upload(base64Image, {
      folder: 'mern-chat-app/avatars',
    });

    data.userAvatar = uploaded.secure_url;

    const newUser = new UserModel(data);

    await newUser.save();

    return newUser ? true : false;
  } catch (error) {
    console.log(error);
  }
};
