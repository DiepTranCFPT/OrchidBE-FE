import React, { useState } from 'react';
// UI đơn giản nhất chỉ dùng thẻ HTML cơ bản
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [products] = useState([
    { id: 1, name: 'Orchid 1', price: 100, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Orchid 2', price: 200, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Orchid 3', price: 300, image: 'https://via.placeholder.com/150' },
  ]);

  const addToCart = (product) => {
    // TODO: Implement add to cart logic
    console.log('Added to cart:', product);
  };

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: 20 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 20 }}>Welcome to Our Store</h1>
      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, width: 220, textAlign: 'center' }}>
            <img src={product.image} alt={product.name} style={{ width: '100%', height: 120, objectFit: 'cover', marginBottom: 10 }} />
            <h3>{product.name}</h3>
            <div style={{ marginBottom: 8 }}>${product.price}</div>
            <button onClick={() => addToCart(product)} style={{ width: '100%', padding: 8, marginBottom: 8 }}>Add to Cart</button>
          </div>
        ))}
      </div>
      <button style={{ marginTop: 20, width: '100%', padding: 10 }} onClick={() => navigate('/cart')}>View Cart</button>
    </div>
  );
};

export default HomePage; 