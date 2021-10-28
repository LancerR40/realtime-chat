const mongoose = require('mongoose');

const schema = mongoose.Schema({
  userFullname: String,
  userEmail: String,
  userPassword: String,
  userAvatar: String,
});

module.exports = schema;
