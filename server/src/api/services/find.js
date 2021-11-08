import User from '../models/User';

class FindService {
  findUser = async (fullname) => {
    const users = await User.find({
      fullname: { $regex: fullname, $options: 'i' },
    });

    return users.map(({ _id, fullname, email, avatar }) => ({
      id: _id,
      fullname,
      email,
      avatar,
    }));
  };
}

export default FindService;
