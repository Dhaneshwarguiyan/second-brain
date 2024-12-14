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
const TagModel_1 = __importDefault(require("../models/TagModel"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { text } = req.body;
    try {
        const response = yield TagModel_1.default.create({
            text
        });
        res.status(200).send({ message: "Successfully added Tag", response: response });
    }
    catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
}));
//to get all tags
router.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield TagModel_1.default.find({});
        res.status(200).send({ message: "Successfully fetched", response: response });
    }
    catch (error) {
        res.status(500).send({ message: "Internal server error" });
    }
}));
exports.default = router;
