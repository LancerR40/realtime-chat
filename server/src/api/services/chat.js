import User from '../models/User';

class ChatServices {
  findUsers = async (fullname, userId) => {
    try {
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

      return { success: true, usersFound: formatUsers };
    } catch (error) {
      console.log(error);
    }
  };

  sendMsg = async (data) => {
    const { outgoingUserId, incomingUserId, msg } = data;
  };
}

export default ChatServices;
