// Completely new minimalist footer, no Bootstrap, no icons, different layout and color
const Footer = () => {
  return (
    <div style={{ width: '100%', background: '#f7f7f7', borderTop: '2px solid #e0e0e0', marginTop: 40, padding: '24px 0' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ fontWeight: 700, fontSize: 20, color: '#2d3a4a', marginBottom: 8 }}>Orchid World</div>
        <div style={{ color: '#6b7684', fontSize: 15, marginBottom: 16, textAlign: 'center', maxWidth: 500 }}>
          Cảm ơn bạn đã ghé thăm website hoa lan. Chúng tôi luôn nỗ lực mang đến trải nghiệm tốt nhất cho khách hàng.
        </div>
        <div style={{ display: 'flex', gap: 24, marginBottom: 12 }}>
          <a href="/home" style={{ color: '#2d3a4a', textDecoration: 'none', fontSize: 15 }}>Trang chủ</a>
          <a href="/about" style={{ color: '#2d3a4a', textDecoration: 'none', fontSize: 15 }}>Giới thiệu</a>
          <a href="/contact" style={{ color: '#2d3a4a', textDecoration: 'none', fontSize: 15 }}>Liên hệ</a>
        </div>
        <div style={{ color: '#b0b8c1', fontSize: 13 }}>
          &copy; {new Date().getFullYear()} Orchid World. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;