"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];
    const decode = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    if (decode) {
        if (typeof decode === "string") {
            res.status(403).json({
                message: "You are not logged in"
            });
            return;
        }
        req.userId = decode.userId;
        next();
    }
    else {
        res.status(403).send({ message: "You are not logged in", success: false });
        return;
    }
};
exports.default = authMiddleware;
