import User from '../models/User';
import toObjectId from '../utils/toObjectId';
import { contactVerify } from '../utils/chat';

class ChatServices {
  chatData = async (userId) => {
    const user = await User.findOne({ _id: userId });

    if (user) {
      const contacts = user.contacts.map(
        ({ _id, fullname, email, avatar, chat }) => ({
          id: _id,
          fullname,
          email,
          avatar,
          chat,
        })
      );

      const { avatar } = user;

      return { contacts, user: { avatar } };
    }
  };

  findUsers = async (fullname, userId) => {
    const usersFound = await User.find({
      fullname: { $regex: `^${fullname}`, $options: 'i' },
    });

    const formatUsers = usersFound
      .filter((user) => user._id.toString() !== userId)
      .map(({ _id, fullname, avatar }) => ({
        id: _id,
        fullname,
        avatar,
      }));

    return { usersFound: formatUsers };
  };

  sendMsg = async (msg, token) => {
    const { incomingUserId, incomingUserFullname, msg: content } = msg;
    const { id: outgoingUserId } = token;

    // Format id
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
      content,
    };

    // This a test code
    // return { outgoingUserId, incomingUserId, content };

    if (!isContact) {
      // Push new contact in outgoing user
      outgoingUser.contacts.push({
        _id: formatIncomingUserId,
        fullname: incomingUserFullname,
        email: incomingUser.email,
        avatar: incomingUser.avatar,
        chat: [newMsg],
      });

      // Save new contact in outgoing user
      const saveOutgoingUser = new User(outgoingUser);
      await saveOutgoingUser.save();

      // Push new contact in incoming user
      incomingUser.contacts.push({
        _id: formatOutgoingUserId,
        fullname: outgoingUser.fullname,
        email: outgoingUser.email,
        avatar: outgoingUser.avatar,
        chat: [newMsg],
      });

      // Save new contact in outgoing user
      const saveIncomingUser = new User(incomingUser);
      await saveIncomingUser.save();

      return { outgoingUserId, incomingUserId, content };
    }

    let index = outgoingUser.contacts.findIndex(
      (contact) => contact._id.toString() === incomingUserId
    );

    outgoingUser.contacts[index].chat.push(newMsg);

    index = incomingUser.contacts.findIndex(
      (contact) => contact._id.toString() === outgoingUserId
    );

    incomingUser.contacts[index].chat.push(newMsg);

    const saveOutgoingUser = new User(outgoingUser);
    await saveOutgoingUser.save();

    const saveIncomingUser = new User(incomingUser);
    await saveIncomingUser.save();

    return { outgoingUserId, incomingUserId, content };
  };
}

export default ChatServices;
