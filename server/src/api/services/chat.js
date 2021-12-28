import User from '../models/User';
import toObjectId from '../utils/toObjectId';
import { contactVerify } from '../utils/chat';

class ChatServices {
  chatData = async (userId) => {
    const user = await User.findOne({ _id: userId }).select(
      'fullname email avatar contacts'
    );

    const contacts = user.contacts.map(
      async ({ _id, fullname, email, avatar, chat }) => ({
        id: _id,
        fullname,
        email,
        avatar,
        chat,
        isConnected: await User.findById({ _id }).then(
          (user) => user.isConnected
        ),
      })
    );

    user.contacts = await Promise.all(contacts);

    return { user };
  };

  findUsers = async (fullname, userId) => {
    const usersFound = await User.find({
      fullname: { $regex: `^${fullname}`, $options: 'i' },
    });
    const { contacts: userContacts } = await User.findOne({ _id: userId });

    const formatUsers = usersFound
      .filter((user) => user._id.toString() !== userId)
      .map(({ _id, fullname, avatar }) => ({
        id: _id,
        fullname,
        avatar,
      }));

    for (let row = 0; row < formatUsers.length; row++) {
      for (let column = 0; column < userContacts.length; column++) {
        if (String(formatUsers[row].id) === String(userContacts[column]._id)) {
          formatUsers.splice(row, 1);
        }
      }
    }

    return { usersFound: formatUsers };
  };

  saveMessage = async (message, token) => {
    const { incomingUserId, messageContent: content } = message;
    const { id: outgoingUserId } = token;

    // Format id
    const formatOutgoingUserId = toObjectId(outgoingUserId);
    const formatIncomingUserId = toObjectId(incomingUserId);

    // Get user outgoing data
    const outgoingUser = await User.findOne({ _id: outgoingUserId }).select(
      'fullname email avatar contacts'
    );

    // Get user incoming data
    const incomingUser = await User.findOne({ _id: incomingUserId }).select(
      'fullname email avatar contacts'
    );

    // Incoming user contact verify
    const isContact = contactVerify(outgoingUser.contacts, incomingUserId);

    // New msg to push
    const newMessage = {
      outgoingUserId: formatOutgoingUserId,
      incomingUserId: formatIncomingUserId,
      content,
      datetime: new Date().getTime(),
    };

    if (!isContact) {
      // Outgoing user new contact saved process
      const outgoingUserContacts = outgoingUser.contacts;
      const { _id, fullname, email, avatar } = incomingUser;

      const newOutgoingUserContact = {
        _id,
        fullname,
        email,
        avatar,
        chat: [newMessage],
      };

      const updatedOutgoingUserContacts = outgoingUserContacts.concat(
        newOutgoingUserContact
      );

      await User.updateOne(
        { _id: outgoingUser._id },
        { $set: { contacts: updatedOutgoingUserContacts } }
      );

      // Incoming user new contact saved process
      const incomingUserContacts = incomingUser.contacts;
      const {
        fullname: outgoingUserFullname,
        email: outgoingUserEmail,
        avatar: outgoingUserAvatar,
      } = outgoingUser;

      const newIncomingUserContact = {
        _id: outgoingUser._id,
        fullname: outgoingUserFullname,
        email: outgoingUserEmail,
        avatar: outgoingUserAvatar,
        chat: [newMessage],
      };

      const updatedIncomingUserContacts = incomingUserContacts.concat(
        newIncomingUserContact
      );

      await User.updateOne(
        { _id: incomingUser._id },
        { $set: { contacts: updatedIncomingUserContacts } }
      );

      return { ...newMessage, isContact: false };
    }

    const outgoingUserContacts = outgoingUser.contacts;

    const updatedOutgoingUserContacts = outgoingUserContacts.map((contact) =>
      String(contact._id) === String(incomingUser._id)
        ? { ...contact, chat: [...contact.chat, newMessage] }
        : contact
    );

    await User.updateOne(
      { _id: outgoingUser._id },
      { $set: { contacts: updatedOutgoingUserContacts } }
    );

    const incomingUserContacts = incomingUser.contacts;

    const updatedIncomingUserContacts = incomingUserContacts.map((contact) =>
      String(contact._id) === String(outgoingUser._id)
        ? { ...contact, chat: [...contact.chat, newMessage] }
        : contact
    );

    await User.updateOne(
      { _id: incomingUser._id },
      { $set: { contacts: updatedIncomingUserContacts } }
    );

    return { ...newMessage, isContact: true };
  };
}

export default ChatServices;
