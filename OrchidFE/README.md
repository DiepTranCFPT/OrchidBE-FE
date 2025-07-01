# Orchid Frontend

Ứng dụng React cho hệ thống quản lý hoa lan với phân quyền ADMIN và CUSTOMER.

## Cấu hình API

Ứng dụng được cấu hình để gọi API qua localhost:8080 với proxy để tránh CORS:

- **Base URL**: `/api` (proxy đến `http://localhost:8080`)
- **Login Endpoint**: `/api/auth/login`
- **Register Endpoint**: `/api/auth/register`

### Proxy Configuration
Ứng dụng sử dụng Vite proxy để tránh lỗi CORS:
- Tất cả request đến `/api/*` sẽ được proxy đến `http://localhost:8080/*`
- Không cần cấu hình CORS trên backend

## Authentication

### Response Format từ API Login

```json
{
  "accountId": 1,
  "role": "ADMIN",
  "accountName": "Khoa",
  "isActive": true,
  "message": "Login successful",
  "email": "dangkhoavo10@gmail.com",
  "authorities": [
    {
      "authority": "ROLE_ADMIN"
    }
  ],
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

### LocalStorage Storage

Thông tin user được lưu trữ trong localStorage với các key:

- `user`: Toàn bộ thông tin user (JSON string)
- `token`: JWT token
- `role`: Role của user (ADMIN/CUSTOMER)
- `accountId`: ID của account
- `accountName`: Tên account
- `email`: Email của user

## Phân quyền

### ADMIN Role
- Truy cập Admin Panel (`/admin`)
- Quản lý danh sách hoa lan (`/orchids`)
- Chỉnh sửa thông tin hoa lan (`/edit/:id`)

### CUSTOMER Role
- Xem trang chủ (`/home`)
- Xem chi tiết sản phẩm (`/detail/:id`)
- Quản lý giỏ hàng (`/cart`)

## Cài đặt và chạy

```bash
# Cài đặt dependencies
npm install

# Chạy ứng dụng
npm run dev
```

## Cấu trúc thư mục

```
src/
├── admin/           # Components cho Admin
├── authen/          # Authentication components
├── components/      # Shared components
├── config/          # Cấu hình API
├── utils/           # Utility functions
└── slices/          # Redux slices (nếu có)
```

## Tính năng chính

- ✅ Đăng nhập/Đăng xuất
- ✅ Phân quyền dựa trên role
- ✅ Bảo vệ route (Protected Routes)
- ✅ Lưu trữ thông tin trong localStorage
- ✅ Navigation bar với thông tin user
- ✅ Chuyển hướng tự động dựa trên role
