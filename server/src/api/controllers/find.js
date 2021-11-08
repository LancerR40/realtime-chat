import FindService from '../services/find';

export const findUserController = async (req, res) => {
  const { fullname } = req.params;

  const find = new FindService();
  const usersFound = await find.findUser(fullname);

  return res.status(200).json({ success: true, users: usersFound });
};
