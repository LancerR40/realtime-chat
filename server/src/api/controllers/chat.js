import ChatServices from '../services/chat';
import User from '../models/User';
import toObjectId from '../utils/toObjectId';
import { contactVerify } from '../utils/chat';

export const findUsersController = async (req, res) => {
  const { fullname } = req.params;
  const { id: userId } = req.user;

  const services = new ChatServices();
  const response = await services.findUsers(fullname, userId);
  const { success, usersFound } = response;

  if (success === true) {
    res.status(200).json({ success: true, usersFound });
  }
};

export const chatDataController = async (req, res) => {
  const { id } = req.user;

  const user = await User.findOne({ _id: id });

  const contacts = user.contacts.map(
    ({ _id, fullname, email, avatar, chat }) => ({
      id: _id,
      fullname,
      email,
      avatar,
      chat,
    })
  );

  res
    .status(200)
    .json({ success: true, user: { avatar: user.avatar }, contacts });
};

export const sendMsgController = async (req, res) => {
  const { incomingUserId, incomingUserFullname, msg } = req.body;
  const { id: outgoingUserId } = req.user;

  // Format ids
  const formatOutgoingUserId = toObjectId(outgoingUserId);
  const formatIncomingUserId = toObjectId(incomingUserId);

  // Get user outgoing data
  const outgoingUser = await User.findOne({ _id: outgoingUserId });

  // Get user incoming data
  const incomingUser = await User.findOne({ _id: incomingUserId });

  // Incoming user contact verify
  const isContact = contactVerify(outgoingUser.contacts, incomingUserId);

  // Msg to push
  const newMsg = {
    outgoingUserId: formatOutgoingUserId,
    incomingUserId: formatIncomingUserId,
    content: msg,
  };

  return res.status(200).json({
    success: true,
    msg: { outgoingUserId, incomingUserId, content: msg },
  });

  // if (!isContact) {
  //   // Push new contact in outgoing user
  //   outgoingUser.contacts.push({
  //     _id: formatIncomingUserId,
  //     fullname: incomingUserFullname,
  //     email: incomingUser.email,
  //     avatar: incomingUser.avatar,
  //     chat: [newMsg],
  //   });

  //   // Save new contact in outgoing user
  //   const saveOutgoingUser = new User(outgoingUser);
  //   await saveOutgoingUser.save();

  //   // Push new contact in incoming user
  //   incomingUser.contacts.push({
  //     _id: formatOutgoingUserId,
  //     fullname: outgoingUser.fullname,
  //     email: outgoingUser.email,
  //     avatar: outgoingUser.avatar,
  //     chat: [newMsg],
  //   });

  //   // Save new contact in outgoing user
  //   const saveIncomingUser = new User(incomingUser);
  //   await saveIncomingUser.save();

  //   return res.status(200).json({
  //     success: true,
  //     msg: { outgoingUserId, incomingUserId, content: msg },
  //   });
  // }

  // let index = outgoingUser.contacts.findIndex(
  //   (contact) => contact._id.toString() === incomingUserId
  // );

  // outgoingUser.contacts[index].chat.push(newMsg);

  // index = incomingUser.contacts.findIndex(
  //   (contact) => contact._id.toString() === outgoingUserId
  // );

  // incomingUser.contacts[index].chat.push(newMsg);

  // const saveOutgoingUser = new User(outgoingUser);
  // await saveOutgoingUser.save();

  // const saveIncomingUser = new User(incomingUser);
  // await saveIncomingUser.save();

  // return res.status(200).json({
  //   success: true,
  //   msg: { outgoingUserId, incomingUserId, content: msg },
  // });
};
