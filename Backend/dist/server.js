"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
require("reflect-metadata");
const database_1 = require("./config/database");
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const app = (0, express_1.default)();
const port = 5000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/uploads', express_1.default.static('uploads'));
database_1.AppDataSource.initialize()
    .then(() => console.log('Database connected'))
    .catch((err) => console.log('Database connection error:', err));
app.use('/api', productRoutes_1.default);
app.listen(port, () => console.log(`Server running on port ${port}`));
