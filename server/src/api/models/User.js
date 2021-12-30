import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  avatar: String,
  contacts: {
    type: [
      {
        _id: mongoose.Types.ObjectId,
        fullname: String,
        email: String,
        avatar: String,
        chat: [
          {
            outgoingUserId: mongoose.Types.ObjectId,
            incomingUserId: mongoose.Types.ObjectId,
            content: String,
            datetime: Number,
          },
        ],
      },
    ],
    default: [],
  },
  isConnected: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('users', UserSchema);

export default User;
