import mongoose, { Document } from "mongoose";

export interface UserInterface extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  __v: number;
  posts: [];
  favourites: [];
}

const UserSchema = new mongoose.Schema({
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

const User = mongoose.model<UserInterface>("Users", UserSchema);

module.exports = { User };
