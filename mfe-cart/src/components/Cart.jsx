import React, { useState, useEffect } from 'react';
import eventBus from 'shared/eventBus';
import './Cart.css';

function Cart() {
  const [items, setItems] = useState([]);

  const total = items.reduce((sum, item) => sum + item.price, 0);

  useEffect(() => {
    // TODO: ecouter les ajouts de produits et mettre a jour le state
    const handler = (product) => {
     setItems((prevItems) => [...prevItems, { ...product, cartId: crypto.randomUUID() }]);

  };

  eventBus.on('add-product', handler);

  return () => {
    eventBus.off('add-product', handler); e
  };
}, []);

  useEffect(() => {
    // TODO: notifier le reste de l'application quand le panier change
    eventBus.emit('total-cart', total);
  }, [items]);


  const handleRemove = (cartId) => {
    eventBus.emit('remove-cart', cartId);
    setItems(prev => prev.filter(item => item.cartId !== cartId));
    console.log("Produit retiré du panier :", cartId);
  };

  const handleClear = () => {
    eventBus.emit('clear-cart');
    setItems([]);
  };

  return (
    <div className="cart">
      <h2>Panier ({items.length})</h2>
      {items.length === 0 ? (
        <p className="empty">Panier vide</p>
      ) : (
        <>
          <ul className="cart-items">
            {items.map(item => (
              <li key={item.cartId} className="cart-item">
                <span className="item-name">{item.name}</span>
                <span className="item-price">{item.price} EUR</span>
                <button className="remove-btn" onClick={() => handleRemove(item.cartId)}>x</button>
              </li>
            ))}
          </ul>
          <div className="cart-footer">
            <div className="cart-total">Total : {total} EUR</div>
            <button className="clear-btn" onClick={handleClear}>Vider le panier</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
