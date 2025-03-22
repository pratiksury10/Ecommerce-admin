import React from 'react';
import axios from 'axios';

interface Product {
  id: number;
  sku: string;
  name: string;
  price: number;
  images: string[];
}

interface ProductListProps {
  products: Product[];
  onProductDeleted: (productId: number) => void;
  onEditProduct: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onProductDeleted, onEditProduct }) => {
  const deleteProduct = async (productId: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      onProductDeleted(productId);
    } catch (error: any) {
      console.error("Error deleting product:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="product-container">
    <h2 className="product-heading">Product List</h2>
    {products.length === 0 ? (
      <p className="no-products">No products available.</p>
    ) : (
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h3 className="product-name">{product.name}</h3>
            <p className="product-sku">SKU: {product.sku}</p>
            <p className="product-price">₹{product.price.toFixed(2)}</p>
            <div className="product-image-container">
              {product.images.length > 0 && (
                <img
                  src={product.images[0].startsWith('http') ? product.images[0] : `http://localhost:5000/${product.images[0]}`}
                  alt={product.name}
                  className="product-image"
                />
              )}
            </div>
            <div className="product-actions">
              <button className="edit-btn" onClick={() => onEditProduct(product)}>Edit</button>
              <button className="delete-btn" onClick={() => deleteProduct(product.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  );
};

export default ProductList;



