// Utility functions để quản lý giỏ hàng trong localStorage

// Lấy giỏ hàng từ localStorage
export const getCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

// Lưu giỏ hàng vào localStorage
export const saveCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Thêm sản phẩm vào giỏ hàng
export const addToCart = (product) => {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === product.id);
  
  if (existingItem) {
    // Nếu sản phẩm đã có, tăng số lượng
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    // Nếu sản phẩm chưa có, thêm mới với số lượng 1
    cart.push({
      ...product,
      quantity: 1
    });
  }
  
  saveCart(cart);
  return cart;
};

// Xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = (productId) => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.id !== productId);
  saveCart(updatedCart);
  return updatedCart;
};

// Cập nhật số lượng sản phẩm
export const updateQuantity = (productId, quantity) => {
  if (quantity < 1) return getCart();
  
  const cart = getCart();
  const updatedCart = cart.map(item => 
    item.id === productId ? { ...item, quantity } : item
  );
  saveCart(updatedCart);
  return updatedCart;
};

// Xóa toàn bộ giỏ hàng
export const clearCart = () => {
  localStorage.removeItem('cart');
  return [];
};

// Tính tổng giá trị giỏ hàng
export const getCartTotal = () => {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
};

// Đếm tổng số sản phẩm trong giỏ hàng
export const getCartItemCount = () => {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
};

// Kiểm tra xem sản phẩm có trong giỏ hàng không
export const isInCart = (productId) => {
  const cart = getCart();
  return cart.some(item => item.id === productId);
}; 