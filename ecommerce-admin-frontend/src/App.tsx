import React, { useState } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

interface Product {
  id: number;
  sku: string;
  name: string;
  price: number;
  images: string[];
}

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleProductAdded = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const handleProductUpdated = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => (product.id === updatedProduct.id ? updatedProduct : product))
    );
    setEditingProduct(null); // Reset form after updating
  };

  const handleProductDeleted = (productId: number) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  return (
    <div>
      <h1 className='head'>Product Management</h1>
      <ProductForm
        onProductAdded={handleProductAdded}
        onProductUpdated={handleProductUpdated}
        editingProduct={editingProduct}
      />
      <ProductList products={products} onProductDeleted={handleProductDeleted} onEditProduct={handleEditProduct} />
    </div>
  );
};

export default App;









// // src/App.tsx
// import React, { useState } from 'react';
// import ProductForm from './components/ProductForm';
// import ProductList from './components/ProductList';

// const App: React.FC = () => {
//   const [products, setProducts] = useState<any[]>([]); // Replace 'any' with a more specific type if you have a Product interface

//   const handleProductAdded = (newProduct: any) => {
//     setProducts((prevProducts) => [...prevProducts, newProduct]);
//   };

//   const handleProductDeleted = (productId: number) => {
//     setProducts((prevProducts) => prevProducts.filter(product => product.id !== productId));
//   };

//   return (
//     <div>
//       <h1>Product Management</h1>
//       <ProductForm onProductAdded={handleProductAdded} />
//       <ProductList products={products} onProductDeleted={handleProductDeleted} />
//     </div>
//   );
// };

// export default App;