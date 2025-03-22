import express from 'express';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../controllers/productController';
import upload from '../middleware/multerConfig';

const router = express.Router();

router.post('/products', upload.array('images'), createProduct);
router.get('/products', getProducts);
router.put('/products/:id', upload.array('images'), updateProduct); // Ensure update works properly
router.delete('/products/:id', deleteProduct); // Ensure delete works properly

export default router;
