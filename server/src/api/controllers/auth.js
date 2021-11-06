import { encryptPassword } from '../utils/bcrypt';
import { signupService } from '../services/auth';

export const signupController = async (req, res) => {
  const { userFullname, userEmail, userPassword } = req.body;
  const { userAvatar } = req.files;

  const newUser = {
    userFullname,
    userEmail,
    userPassword: await encryptPassword(userPassword),
    userAvatar,
  };

  const isSuccessfully = await signupService(newUser);

  if (isSuccessfully !== true) {
    return res.status(500).json({ success: false });
  }

  res
    .status(200)
    .json({ success: true, message: 'Successfully registered user!' });
};
