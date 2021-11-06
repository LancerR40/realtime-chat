const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  userFullname: String,
  userEmail: String,
  userPassword: String,
  userAvatar: String,
});

const User = mongoose.model('Users', schema);

export default User;
