"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var router = express_1.default.Router();
var Post = require("../models/posts");
router.post("/", function (req, res) {
    //  Post.find({ image: req.body.image }).exec().then((posts) => {
    //   if (posts.length > 0) {
    //       return res.status(409).json({ message: "That image was already posted" });
    //   } else {
    var post = new Post({
        _id: new mongoose_1.default.Types.ObjectId(),
        title: req.body.title,
        tags: req.body.tags,
        image: req.body.image,
        author: req.body.author,
        likes: 0,
        comments: [],
    });
    post
        .save()
        .then(function (result) {
        return res.status(201).json(post);
    })
        .catch(function (err) {
        return res.status(500).json({ error: err });
    });
    //   }
    //  });
});
router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var posts, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Post.find()];
            case 1:
                posts = _a.sent();
                return [2 /*return*/, res.status(200).json(posts)];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, res.status(400).json({ message: err_1 })];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/:postId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!mongoose_1.default.Types.ObjectId.isValid(req.params.postId)) return [3 /*break*/, 2];
                return [4 /*yield*/, Post.findById(req.params.postId)];
            case 1:
                post = _a.sent();
                if (!post)
                    return [2 /*return*/, res.status(404).send("The post with the given ID was not found.")];
                res.send(post);
                return [3 /*break*/, 3];
            case 2:
                res.status(404).send("Invalid ID");
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
router.delete("/:postId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var post;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!mongoose_1.default.Types.ObjectId.isValid(req.params.postId)) return [3 /*break*/, 2];
                return [4 /*yield*/, Post.findByIdAndRemove(req.params.postId)];
            case 1:
                post = _a.sent();
                if (!post)
                    return [2 /*return*/, res.status(404).send("The post with the given ID was not found.")];
                res.status(200).send(post);
                return [3 /*break*/, 3];
            case 2: return [2 /*return*/, res.status(404).send("Invalid ID")];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.patch("/addComment/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, text, author;
    return __generator(this, function (_b) {
        id = req.params.id;
        _a = req.body, text = _a.text, author = _a.author;
        Post.findOne({ _id: id })
            .exec()
            .then(function (post) { return __awaiter(void 0, void 0, void 0, function () {
            var date, update;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = new Date();
                        update = {
                            comments: __spreadArray(__spreadArray([], post.comments), [
                                {
                                    text: text,
                                    author: author,
                                    time: date,
                                },
                            ]),
                        };
                        return [4 /*yield*/, Post.findOneAndUpdate({ _id: id }, update, { returnOriginal: true })
                                .exec()
                                .then(function (post) {
                                return res.status(200).send(post);
                            }, function (err) {
                                return res.status(404).json({ message: err });
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
router.patch("/deleteComment/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, text;
    return __generator(this, function (_a) {
        id = req.params.id;
        text = req.body.text;
        Post.findOne({ _id: id })
            .exec()
            .then(function (post) { return __awaiter(void 0, void 0, void 0, function () {
            var comments, update;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        comments = post.comments.filter(function (_post) { return _post.text !== text; });
                        update = {
                            comments: comments,
                        };
                        return [4 /*yield*/, Post.findOneAndUpdate({ _id: id }, update, { returnOriginal: true })
                                .exec()
                                .then(function (post) {
                                return res.status(200).send(post);
                            }, function (err) {
                                return res.status(404).json({ message: err });
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
router.put("/edit/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        id = req.params.id;
        Post.findOne({ _id: id }, function (err, foundPost) {
            if (err) {
                res.status(404).send("Invalid ID");
            }
            else {
                if (!foundPost) {
                    res.status(404).send("The post with the given ID was not found.");
                }
                else {
                    if (req.body.title) {
                        foundPost.title = req.body.title;
                    }
                    if (req.body.tags) {
                        foundPost.tags = req.body.tags;
                    }
                    if (req.body.likes) {
                        foundPost.likes = req.body.likes;
                    }
                    foundPost.save(function (err, updatedPost) {
                        if (err) {
                            res.status(500).send("Something went wrong");
                        }
                        else {
                            res.status(200).send(updatedPost);
                        }
                    });
                }
            }
        });
        return [2 /*return*/];
    });
}); });
module.exports = router;
