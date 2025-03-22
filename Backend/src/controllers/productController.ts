import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Product } from '../entities/Product';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { sku, name, price } = req.body;
    const images = (req.files as Express.Multer.File[])?.map(file => file.path) || [];

    const product = AppDataSource.getRepository(Product).create({
      sku,
      name,
      price: parseFloat(price),
      images,
    });

    await AppDataSource.getRepository(Product).save(product);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getProducts = async (_: Request, res: Response) => {
  try {
    const products = await AppDataSource.getRepository(Product).find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { sku, name, price } = req.body;
      const images = (req.files as Express.Multer.File[])?.map(file => file.path) || [];
  
      const productRepository = AppDataSource.getRepository(Product);
      const product = await productRepository.findOneBy({ id: parseInt(id) });
  
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
  
      product.sku = sku || product.sku;
      product.name = name || product.name;
      product.price = price ? parseFloat(price) : product.price;
      product.images = images.length ? images : product.images;
  
      await productRepository.save(product);
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating product' });
    }
  };
  
  export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const productRepository = AppDataSource.getRepository(Product);
  
      const product = await productRepository.findOneBy({ id: parseInt(id) });
      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
  
      await productRepository.remove(product);
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting product' });
    }
  };
  