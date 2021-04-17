"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var PostsSchema = new mongoose_1.default.Schema({
    _id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    comments: {
        type: Array,
        default: [],
    },
    tags: {
        type: [String],
        required: true,
        lowercase: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
        required: true
    }
});
module.exports = mongoose_1.default.model("Posts", PostsSchema);
