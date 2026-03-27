import React, { useEffect, useState } from 'react';

const CartView: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const loadCartData = () => {
    const data = sessionStorage.getItem('cart');
    setCartItems(data ? JSON.parse(data) : []);
  };
  const removeItem = (indexToRemove: number) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    
    // Actualizamos el "mundo exterior"
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));

    // Actualizamos la "realidad local" (React)
    setCartItems(updatedCart);
  };

  // 3. Finalizar Venta
  const Selling = () => {
    sessionStorage.removeItem('cart');
    window.dispatchEvent(new Event('cartUpdated'));
    setCartItems([]); // Esto limpia la pantalla al instante
    console.log('Venta finalizada. Carrito vacío.');
  };

  useEffect(() => {
    loadCartData();

    const handleExternalUpdate = () => {
      // Solo recargamos si el storage cambió DESDE FUERA (ej. otra pestaña u otro componente)
      // Para evitar el doble render, verificamos si el contenido es distinto
      const data = sessionStorage.getItem('cart');
      const parsedData = data ? JSON.parse(data) : [];
      
      // Solo actualiza el estado si realmente hay cambios
      setCartItems((currentItems) => {
        if (JSON.stringify(currentItems) !== JSON.stringify(parsedData)) {
          return parsedData;
        }
        return currentItems;
      });
    };

    window.addEventListener('cartUpdated', handleExternalUpdate);
    return () => window.removeEventListener('cartUpdated', handleExternalUpdate);
  }, []);

  const totalCart = cartItems.reduce((acc, item) => acc + (Number(item.totalPrice) || 0), 0);

  return (
    <div className="card shadow-sm border" style={{ maxWidth: '350px', position: 'sticky', top: '20px', marginLeft: 'auto' }}>
      <div className="card-body">
        <h5 className="card-title fw-bold"> Mi Carrito</h5>
        <hr />
        {cartItems.length === 0 ? (
          <p className="text-muted small">El carrito está vacío.</p>
        ) : (
          <>
            <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <table className="table table-sm align-middle">
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={`${item.id || index}-${index}`} className="small">
                      <img src={item.image} alt={item.name} style={{ width: '40px', height: '40px', objectFit: 'cover' }} className="rounded" />
                      <td className="text-truncate" style={{ maxWidth: '100px' }}>{item.name}</td>
                      <td>x{item.quantity}</td>
                      <td className="text-end">${Number(item.totalPrice).toLocaleString()}</td>
                      <td className="text-end">
                        <button className="btn btn-sm text-danger border-0" 
                        onClick={() => removeItem(index)}>✕</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="text-end fw-bold mt-3 border-top pt-2">
              Total: ${totalCart.toLocaleString()}
            </div>
            <button className="btn btn-primary w-100 mt-3 fw-bold" onClick={Selling}>
              Finalizar Compra
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartView;