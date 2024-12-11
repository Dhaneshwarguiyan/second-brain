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
//middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173'],
    credentials: true
}));
app.use('/api/v1/users', userRoutes_1.default);
app.use('/api/v1/content', contentRoutes_1.default);
app.use('/api/v1/link', linkRoutes_1.default);
const PORT = process.env.PORT || 3000;
//connect to db
(0, config_1.default)();
//connect to server
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
