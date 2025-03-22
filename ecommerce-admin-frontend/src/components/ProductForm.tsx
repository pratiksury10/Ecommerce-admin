import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductForm.css';

interface Product {
  id: number;
  sku: string;
  name: string;
  price: number;
  images: string[];
}

interface ProductFormProps {
  onProductAdded: (product: Product) => void;
  onProductUpdated: (product: Product) => void;
  editingProduct: Product | null;
}

const ProductForm: React.FC<ProductFormProps> = ({ onProductAdded, onProductUpdated, editingProduct }) => {
  const [sku, setSku] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number | string>('');
  const [images, setImages] = useState<FileList | null>(null);

  useEffect(() => {
    if (editingProduct) {
      setSku(editingProduct.sku);
      setName(editingProduct.name);
      setPrice(editingProduct.price);
    }
  }, [editingProduct]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('sku', sku);
    formData.append('name', name);
    formData.append('price', price.toString());
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
    }

    try {
      if (editingProduct) {
        // Update product
        const response = await axios.put(`http://localhost:5000/api/products/${editingProduct.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        onProductUpdated(response.data);
      } else {
        // Add new product
        const response = await axios.post('http://localhost:5000/api/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        onProductAdded(response.data);
      }

      setSku('');
      setName('');
      setPrice('');
      setImages(null);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div>
        <label>SKU:</label>
        <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} required />
      </div>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Price:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <div>
        <label>Images:</label>
        <input type="file" multiple onChange={(e) => setImages(e.target.files)} />
      </div>
      <button type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</button>
    </form>
  );
};

export default ProductForm;






