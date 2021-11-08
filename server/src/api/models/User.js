import mongoose, { Schema } from 'mongoose';

const UserSchema = new mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  avatar: String,
  contacts: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model('users', UserSchema);

export default User;
