
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function HomeScreen() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const [api, setAPI] = useState([]);
  const [showMsg, setShowMsg] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { fetchData(); }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(baseUrl);
      const sortedData = response.data.sort((a, b) => parseInt(b.empId) - parseInt(a.empId));
      setAPI(sortedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const addToCart = (item) => {
    const storedCart = localStorage.getItem('cart');
    const cartItems = storedCart ? JSON.parse(storedCart) : [];
    cartItems.push(item);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    setShowMsg(true);
    setTimeout(() => setShowMsg(false), 1500);
  };

  return (
    <div style={{ width: '100%', maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center', padding: '32px 0', position: 'relative' }}>
      {showMsg && (
        <div style={{ position: 'fixed', top: 30, left: 0, right: 0, margin: 'auto', width: 260, background: '#43a047', color: '#fff', borderRadius: 8, padding: '12px 0', textAlign: 'center', fontWeight: 600, fontSize: 16, zIndex: 1000, boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}>
          Thêm vào giỏ hàng thành công!
        </div>
      )}
      {api.map((item) => (
        <div key={item.id} style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', width: 280, padding: 18, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img src={item.image} alt={item.orchidName} style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 8, marginBottom: 12 }} />
          <div style={{ fontWeight: 600, fontSize: 17, color: '#2d3a4a', marginBottom: 8 }}>{item.orchidName}</div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link to={`/detail/${item.id}`} style={{ textDecoration: 'none' }}>
              <button style={{ background: '#007bff', color: '#fff', border: 'none', borderRadius: 5, padding: '7px 16px', fontSize: 15, cursor: 'pointer' }}>Chi tiết</button>
            </Link>
            <button style={{ background: '#43a047', color: '#fff', border: 'none', borderRadius: 5, padding: '7px 16px', fontSize: 15, cursor: 'pointer' }} onClick={() => addToCart(item)}>Thêm vào giỏ</button>
          </div>
        </div>
      ))}
    </div>
  );
}
