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
const ContentModel_1 = __importDefault(require("../models/ContentModel"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const open_graph_scraper_1 = __importDefault(require("open-graph-scraper"));
const router = express_1.default.Router();
//add new content
router.post('/', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, link, description } = req.body;
    const userId = req.userId;
    try {
        const content = yield ContentModel_1.default.create({
            title,
            description,
            link,
            userId,
        });
        res.status(200).send({ message: "Successfully created", content: content, success: true });
    }
    catch (error) {
        res.status(400).send({ message: "Internal Error", success: false });
    }
}));
//fetchin all content
router.get('/', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const contents = yield ContentModel_1.default.find({ userId });
        res.status(200).send({ contents: contents, success: true });
    }
    catch (error) {
        res.status(400).send({ message: "Internal error", success: false });
    }
}));
//delete a content
router.delete('/delete/:id', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.params.id;
    const userId = req.userId;
    try {
        const content = yield ContentModel_1.default.deleteOne({ _id: contentId, userId: userId });
        res.status(200).send({
            message: "Successfully deleted",
            content: content,
            success: true
        });
    }
    catch (error) {
        res.status(400).send({
            message: "Internal Error",
            success: false
        });
    }
}));
router.post("/metadata", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    if (!url) {
        res.status(400).json({ error: "No url provided" });
        return;
    }
    try {
        const { result } = yield (0, open_graph_scraper_1.default)({ url });
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch metadata" });
    }
}));
exports.default = router;
