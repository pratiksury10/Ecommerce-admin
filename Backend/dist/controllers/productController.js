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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.createProduct = void 0;
const database_1 = require("../config/database");
const Product_1 = require("../entities/Product");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { sku, name, price } = req.body;
        const images = ((_a = req.files) === null || _a === void 0 ? void 0 : _a.map(file => file.path)) || [];
        const product = database_1.AppDataSource.getRepository(Product_1.Product).create({
            sku,
            name,
            price: parseFloat(price),
            images,
        });
        yield database_1.AppDataSource.getRepository(Product_1.Product).save(product);
        res.json(product);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.createProduct = createProduct;
const getProducts = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield database_1.AppDataSource.getRepository(Product_1.Product).find();
        res.json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching products' });
    }
});
exports.getProducts = getProducts;
