import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { type Product, productsData } from "./ProductsInterface";
import AddItemView from '../AddItemModel/AddItemView';
import './ProductsStyle.css';

const ProductsView: React.FC = () => {
  const [productToSelect, setProductToSelect] = useState<Product | null>(null);
  const handleConfirmPurchase = (units: number) => {
    if (!productToSelect) return;
    console.log('Producto a agregar:', productToSelect, 'Unidades:', units);
    const currentCart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    const existingProductIndex = currentCart.findIndex((item: any) => item.id === productToSelect.id);
    let updatedCart;
    if (existingProductIndex !== -1) {
      updatedCart = [...currentCart];
      updatedCart[existingProductIndex].quantity += units;
      updatedCart[existingProductIndex].totalPrice = updatedCart[existingProductIndex].quantity * updatedCart[existingProductIndex].price;
    } else {
      const newItem = {
        ...productToSelect,
        quantity: units,
        totalPrice: productToSelect.price * units
      };
      updatedCart = [...currentCart, newItem];
    }
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
    setProductToSelect(null);
  };
  return (
    <div className="container bg-light py-4">
      <h2 className="h4 fw-bold mb-4 px-3 text-center">Productos Disponibles</h2>      
      <div className="row g-4 justify-content-center">
        {productsData.map((product: Product) => (
          <div key={product.id} className="col-12 col-md-4 d-flex align-items-stretch">
            <div className="card h-100 border-0 shadow-sm amazon-card w-100 d-flex flex-column">
              <div className="product-img-container">
                <img src={product.image} className="product-img" alt={product.name} />
              </div>
              <div className="card-body d-flex flex-column flex-grow-1">
                <h5 className="card-title fs-6 mb-2 text-truncate-2">{product.name}</h5>
                <div className="mt-auto pt-2">
                  <p className="h4 fw-bold mb-2">
                    <span className="fs-6 align-top">$</span>
                    {product.price.toLocaleString()}
                  </p>
                  <button 
                  className="btn btn-amazon btn-sm w-100 fw-medium" 
                  onClick={() => setProductToSelect(product)}>
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {productToSelect && (
        <AddItemView 
          product={productToSelect} 
          onClose={() => setProductToSelect(null)} 
          onConfirm={handleConfirmPurchase}
        />
      )}
    </div>
  );
};
export default ProductsView;