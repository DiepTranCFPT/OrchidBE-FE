import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartItemCount } from '../utils/cart';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const handleRemoveFromCart = (id) => {
    const updatedCart = removeFromCart(id);
    setCartItems(updatedCart);
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    const updatedCart = updateQuantity(id, newQuantity);
    setCartItems(updatedCart);
  };

  const handleClearCart = () => {
    clearCart();
    setCartItems([]);
  };

  const total = getCartTotal();
  const itemCount = getCartItemCount();

  return (
    <div style={{ width: '100%', maxWidth: 900, margin: '0 auto', padding: '32px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div style={{ fontWeight: 700, fontSize: 22, color: '#2d3a4a' }}>Giỏ hàng</div>
        <button onClick={() => navigate('/home')} style={{ background: '#007bff', color: '#fff', border: 'none', borderRadius: 5, padding: '7px 16px', fontSize: 15, cursor: 'pointer' }}>Tiếp tục mua sắm</button>
      </div>
      {cartItems.length === 0 ? (
        <div style={{ background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: 32, textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🛒</div>
          <div style={{ fontWeight: 600, fontSize: 18, color: '#2d3a4a', marginBottom: 8 }}>Giỏ hàng trống</div>
          <div style={{ color: '#6b7684', marginBottom: 16 }}>Bạn chưa có sản phẩm nào trong giỏ hàng.</div>
          <button onClick={() => navigate('/home')} style={{ background: '#43a047', color: '#fff', border: 'none', borderRadius: 5, padding: '7px 16px', fontSize: 15, cursor: 'pointer' }}>Mua sắm ngay</button>
        </div>
      ) : (
        <>
          <table style={{ width: '100%', background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', marginBottom: 24 }}>
            <thead>
              <tr style={{ background: '#f7f7f7', color: '#2d3a4a' }}>
                <th style={{ padding: 12, textAlign: 'left' }}>Tên</th>
                <th style={{ padding: 12 }}>Loại</th>
                <th style={{ padding: 12 }}>Giá</th>
                <th style={{ padding: 12 }}>Số lượng</th>
                <th style={{ padding: 12 }}>Xóa</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td style={{ padding: 12 }}>{item.orchidName}</td>
                  <td style={{ padding: 12 }}>{item.isNatural ? 'Tự nhiên' : 'Công nghiệp'}</td>
                  <td style={{ padding: 12 }}>{(item.price || 0).toLocaleString('vi-VN')} VNĐ</td>
                  <td style={{ padding: 12 }}>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity || 1}
                      onChange={e => handleUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                      style={{ width: 50, padding: 4, border: '1px solid #ccc', borderRadius: 4 }}
                    />
                  </td>
                  <td style={{ padding: 12 }}>
                    <button onClick={() => handleRemoveFromCart(item.id)} style={{ background: '#f44336', color: '#fff', border: 'none', borderRadius: 4, padding: '4px 10px', fontSize: 14, cursor: 'pointer' }}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 600, fontSize: 17, color: '#2d3a4a' }}>Tổng cộng: {total.toLocaleString('vi-VN')} VNĐ</div>
            <button onClick={handleClearCart} style={{ background: '#b0b8c1', color: '#fff', border: 'none', borderRadius: 5, padding: '7px 16px', fontSize: 15, cursor: 'pointer' }}>Xóa tất cả</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
                           