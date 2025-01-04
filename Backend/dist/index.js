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
const config_1 = __importDefault(require("./db/config"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const FeedbackModel_1 = __importDefault(require("./models/FeedbackModel"));
dotenv_1.default.config();
const app = (0, express_1.default)();
//routes import
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const contentRoutes_1 = __importDefault(require("./routes/contentRoutes"));
const linkRoutes_1 = __importDefault(require("./routes/linkRoutes"));
const TagRoutes_1 = __importDefault(require("./routes/TagRoutes"));
//middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header'],
}));
app.use('/api/v1/users', userRoutes_1.default);
app.use('/api/v1/content', contentRoutes_1.default);
app.use('/api/v1/link', linkRoutes_1.default);
app.use('/api/v1/tag', TagRoutes_1.default);
app.post('/api/v1/feedback', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { feedback } = req.body;
        const response = yield FeedbackModel_1.default.create({ feedback });
        res.send({ message: "Thanks for your valuable feedback" });
    }
    catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
}));
app.get('/', (req, res) => {
    res.json('Hello world');
});
const PORT = process.env.PORT || 3000;
//connect to db
(0, config_1.default)();
//connect to server
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
