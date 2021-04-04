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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var User = require("../models/user").User;
var UserControler = require("../controllers/user");
var Auth = require("../controllers/authentication");
var bcrypt = require("bcrypt");
router.post("/register", function (req, res) {
    User.find({ email: req.body.email })
        .exec()
        .then(function (users) {
        if (users.length > 0)
            return res.status(409).json({ message: "email already exists" });
        else {
            User.find({ name: req.body.name }).exec().then(function (users) {
                if (users.length > 0)
                    return res.status(409).json({ message: "such name already exists" });
                else {
                    Auth.send(req.body.name, req.body.email, req.body.password);
                    res.send({ message: "email sent" });
                }
            });
        }
    });
});
router.post("/email-activation", Auth.activateAccount);
router.get("/", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User.find()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.status(200).json(users)];
            case 2:
                err_1 = _a.sent();
                return [2 /*return*/, res.status(400).json({ message: err_1 })];
            case 3: return [2 /*return*/];
        }
    });
}); });
router.get("/user/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        User.findOne({ _id: req.params.id }).exec().then(function (user) {
            res.status(200).json(user);
        }).catch(function (err) {
            res.status(404).json({ error: err });
        });
        return [2 /*return*/];
    });
}); });
router.get("/login", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        User.findOne({ email: req.body.email })
            .exec()
            .then(function (user) {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (err)
                    return res.status(400).json({ message: err });
                if (result)
                    return res.status(200).json(user);
                return res.status(401).json({ message: "Auth failed" });
            });
        })
            .catch(function (err) {
            return res.status(400).send(err);
        });
        return [2 /*return*/];
    });
}); });
router.patch("/edit/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User.findOneAndUpdate({ _id: req.params.id }, req.body, {
                    returnOriginal: true,
                })
                    .exec()
                    .then(function (user) {
                    res.status(200).json({ message: "updated" });
                }, function (err) {
                    res.status(404).send({ message: err });
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.patch("/addPost/:id", UserControler.addPost);
router.patch("/deletePost/:id", UserControler.deletePost);
router.patch("/editName/:id", UserControler.editName);
router.patch("/editEmail/:id", UserControler.editEmail);
router.patch("/editPassword/:id", UserControler.editPassword);
module.exports = router;
