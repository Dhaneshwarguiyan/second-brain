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
const LinkModel_1 = __importDefault(require("../models/LinkModel"));
const utils_1 = __importDefault(require("../utils/utils"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = express_1.default.Router();
//creating a shareable link
router.post('/share', authMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const share = req.body.share;
    try {
        const link = yield LinkModel_1.default.findOne({ userId });
        if (share) {
            //if the link is already shared
            if (link) {
                res.status(200).send({ hash: link.hash });
                return;
            }
            //Generating a unique link
            const hash = (0, utils_1.default)(10);
            //Updating the link in the database
            const response = yield LinkModel_1.default.create({
                userId: userId,
                hash: hash
            });
            res.status(200).send({
                hash: hash
            });
        }
        else {
            //Deleting the entry because the share option is disabled
            yield LinkModel_1.default.deleteOne({
                userId
            });
            res.status(200).send({ message: "Successfully deleted link" });
        }
    }
    catch (error) {
        res.status(403).send({ message: "Something went wrong." });
    }
}));
//opening a shared link
//this route will not be authenticated and anyone with the link can access the brain
router.get('/:shareLink', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.params.shareLink;
    try {
        //using the link find the user and then access its brain
        const user = yield LinkModel_1.default.findOne({ hash: link }).populate('userId');
        if (user) {
            const content = yield ContentModel_1.default.find({ userId: user === null || user === void 0 ? void 0 : user.userId });
            res.status(200).send({
                user,
                content
            });
        }
        else {
            //if the user doesnt exist 
            res.status(404).send({ message: "No user exist", success: false });
        }
    }
    catch (error) {
        res.status(404).send({
            message: "Link is Invalid",
            success: false
        });
    }
}));
exports.default = router;
