"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//Content Schema
const contentSchema = new mongoose_1.default.Schema({
    link: {
        type: String,
        required: true
    },
    type: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    linkTitle: {
        type: String
    },
    image: {
        type: String,
    },
    description: String,
    tags: [{
            type: String,
            unique: true
        }],
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });
const Content = mongoose_1.default.model('Content', contentSchema);
exports.default = Content;
