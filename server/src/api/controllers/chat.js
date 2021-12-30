import ChatServices from '../services/chat';

export const chatDataController = async (req, res) => {
  const { id } = req.user;

  try {
    const service = new ChatServices();
    const { user } = await service.chatData(id);
    console.log(user);

    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const findUsersController = async (req, res) => {
  const { fullname } = req.params;
  const { id: userId } = req.user;

  try {
    const services = new ChatServices();
    const { usersFound } = await services.findUsers(fullname, userId);

    res.status(200).json({ usersFound });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const sendMessageController = async (req, res) => {
  try {
    const { body, user } = req;

    const service = new ChatServices();
    const message = await service.saveMessage(body, user);

    res.status(200).json({ message });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
