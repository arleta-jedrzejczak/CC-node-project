import { text } from 'body-parser';
import mongoose, { Document } from 'mongoose';

interface Comments {
    author: String;
    text: String;
    time: Date;
}

export interface PostsI extends Document{
    _id: mongoose.Types.ObjectId;
    author: number;
    title: string;
    comments?: Comments[];
    tags: String[];
    likes: Number[];
    image: string;
}

const PostsSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    author: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    comments: {
        type: Array,
        default: []
    },
    tags: {
        type: [String],
        required: true,
        lowercase: true
    },
    likes: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model<PostsI>("Posts", PostsSchema);