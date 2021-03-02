const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  },
  password: {
    type: String,
    require: true,
  },
  favourites: {
    type: Array,
    default: [],
  },
  posts: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Users", UserSchema);
