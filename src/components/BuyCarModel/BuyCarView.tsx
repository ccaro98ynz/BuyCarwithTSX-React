import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CartView: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const loadCartData = () => {
    const data = sessionStorage.getItem('cart');
    setCartItems(data ? JSON.parse(data) : []);
  };
  const removeItem = (indexToRemove: number) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    setCartItems(updatedCart);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };
  useEffect(() => {
    loadCartData();
    window.addEventListener('cartUpdated', loadCartData);
    return () => window.removeEventListener('cartUpdated', loadCartData);
  }, []);
  const totalCart = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const ProcessSell = () => {
    window.dispatchEvent(new Event('cartUpdated'));
    sessionStorage.removeItem('cart');
  };
  return (
    <div className="card shadow-sm rounded border" style={{ maxWidth: '350px', position: 'sticky', top: '20px', marginLeft: 'auto' }}>
      <div className="card-body">
        <h5 className="card-title fw-bold">🛒 Mi Carrito</h5>
        <hr />
        {cartItems.length === 0 ? (
          <p className="text-muted small">El carrito está vacío.</p>
        ) : (
          <>
            <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <table className="table table-sm align-middle">
                <thead>
                  <tr className="small text-muted">
                    <th>Prod.</th>
                    <th>Cant.</th>
                    <th className="text-end">Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index} className="small">
                      <td>
                        <div className="d-flex align-items-center">
                          <img src={item.image} alt="" style={{ width: '30px', marginRight: '8px' }} />
                          <span className="text-truncate" style={{ maxWidth: '60px' }}>{item.name}</span>
                        </div>
                      </td>
                      <td>{item.quantity}</td>
                      <td className="text-end">${item.totalPrice.toLocaleString()}</td>
                      <td className="text-end">
                        <button 
                          className="btn btn-sm btn-outline-danger border-0"
                          onClick={() => removeItem(index)}
                          title="Eliminar producto"
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-end fw-bold mt-3 border-top pt-2">
              Total: ${totalCart.toLocaleString()}
            </div>
            <button 
              className="btn btn-primary w-100 mt-3 fw-bold"
              onClick={() => ProcessSell()}
            >
              Finalizar Compra
            </button>
          </>
        )}
      </div>
    </div>
  );
};
export default CartView;