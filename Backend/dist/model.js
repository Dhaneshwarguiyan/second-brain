"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = exports.User = exports.Content = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//Content Schema
const contentSchema = new mongoose_1.default.Schema({
    link: String,
    type: String,
    title: String,
    tags: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Tag'
        }],
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    }
});
exports.Content = mongoose_1.default.model('Content', contentSchema);
//User Schema
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
});
exports.User = mongoose_1.default.model('User', userSchema);
//Tags Schema
const tagSchema = new mongoose_1.default.Schema({
    title: String
});
exports.Tag = mongoose_1.default.model('Tag', tagSchema);
//Link Schema
const linkSchema = new mongoose_1.default.Schema({
    hash: String,
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    }
});
