import ChatServices from '../services/chat';

export const chatDataController = async (req, res) => {
  const { id } = req.user;

  try {
    const service = new ChatServices();
    const { user, contacts } = await service.chatData(id);

    res.status(200).json({ user, contacts });
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

export const sendMsgController = async (req, res) => {
  try {
    const service = new ChatServices();
    const { outgoingUserId, incomingUserId, content, datetime } =
      await service.sendMsg(req.body, req.user);

    const msg = {
      outgoingUserId,
      incomingUserId,
      content,
      datetime,
    };

    res.status(200).json({ msg });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
