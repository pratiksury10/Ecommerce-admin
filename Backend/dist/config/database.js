"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Product_1 = require("../entities/Product");
require("dotenv/config");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Product_1.Product],
    synchronize: true,
});
exports.AppDataSource.initialize()
    .then(() => console.log('Database connected'))
    .catch((err) => console.log('Database connection error:', err));
