"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controllers/productController");
const multerConfig_1 = __importDefault(require("../middleware/multerConfig"));
const router = express_1.default.Router();
router.post('/products', multerConfig_1.default.array('images'), productController_1.createProduct);
router.get('/products', productController_1.getProducts);
exports.default = router;
