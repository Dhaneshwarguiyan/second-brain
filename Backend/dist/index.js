"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./db/config"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
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
    origin: ['https://brainly-frontend-8xdz.onrender.com/'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header'],
}));
app.use('/api/v1/users', userRoutes_1.default);
app.use('/api/v1/content', contentRoutes_1.default);
app.use('/api/v1/link', linkRoutes_1.default);
app.use('/api/v1/tag', TagRoutes_1.default);
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
