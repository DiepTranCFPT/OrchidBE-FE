import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Orchid 1', price: 100, quantity: 1 },
    { id: 2, name: 'Orchid 2', price: 200, quantity: 2 },
  ]);

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Your Cart</h1>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tableHeader}>
            <th style={styles.tableCell}>Product</th>
            <th style={styles.tableCell}>Price</th>
            <th style={styles.tableCell}>Quantity</th>
            <th style={styles.tableCell}>Total</th>
            <th style={styles.tableCell}>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id} style={styles.tableRow}>
              <td style={styles.tableCell}>{item.name}</td>
              <td style={styles.tableCell}>${item.price}</td>
              <td style={styles.tableCell}>{item.quantity}</td>
              <td style={styles.tableCell}>${item.price * item.quantity}</td>
              <td style={styles.tableCell}>
                <button
                  onClick={() => removeFromCart(item.id)}
                  style={styles.removeButton}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 style={styles.total}>Total: ${total}</h3>
      <button
        style={styles.checkoutButton}
        onClick={() => navigate('/checkout')}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 800,
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '2rem',
    color: '#333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  tableHeader: {
    backgroundColor: '#f5f5f5',
    textAlign: 'left',
  },
  tableCell: {
    padding: '12px',
    border: '1px solid #ddd',
    textAlign: 'center',
  },
  tableRow: {
    backgroundColor: '#fafafa',
  },
  removeButton: {
    padding: '6px 12px',
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  removeButtonHover: {
    backgroundColor: '#e04040',
  },
  total: {
    textAlign: 'right',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginTop: '20px',
  },
  checkoutButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  checkoutButtonHover: {
    backgroundColor: '#45a049',
  },
};

export default CartPage;
