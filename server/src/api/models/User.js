import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  avatar: String,
  contacts: {
    type: Array,
    default: [],
  },
  isConnected: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('users', UserSchema);

export default User;
