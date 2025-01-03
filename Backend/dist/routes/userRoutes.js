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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
//signup route
//zod validation and hashing
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email, fullname } = req.body;
    try {
        const user = yield UserModel_1.default.create({
            username,
            password,
            fullname,
            email
        });
        res.status(200).send({ message: "User Created successfully" });
    }
    catch (error) {
        res.status(411).send({ message: "User Already exists", success: false });
    }
}));
//signin... route
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield UserModel_1.default.findOne({ email });
        if (user) {
            if (password === user.password) {
                const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET);
                res.status(200).send({
                    username: user.username,
                    token: token
                });
                return;
            }
        }
        res.status(403).send({ message: "Wrong email/password" });
    }
    catch (error) {
        res.status(500).send({ message: "Internal server Error" });
    }
}));
exports.default = router;
