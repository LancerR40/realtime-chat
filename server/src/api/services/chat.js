import User from '../models/User';
import toObjectId from '../utils/toObjectId';
import { contactVerify } from '../utils/chat';

import ChatEmitter from '../subscribers/chat';

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
    const { incomingUserId, msg: content } = msg;
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

    // New msg to push
    const newMsg = {
      outgoingUserId: formatOutgoingUserId,
      incomingUserId: formatIncomingUserId,
      content,
      datetime: new Date().getTime(),
    };

    const data = {
      newMsg,
      outgoingUser,
      incomingUser,
    };

    if (!isContact) {
      ChatEmitter.emit('isContact:false', data, User);
      return newMsg;
    }

    ChatEmitter.emit('isContact:true', data, User);
    return newMsg;
  };
}

export default ChatServices;
