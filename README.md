# Forgot OTP - Ứng Dụng Quên Mật Khẩu Với OTP

Một ứng dụng web hiện đại cho phép người dùng đăng ký, đăng nhập, quên mật khẩu và đặt lại mật khẩu thông qua mã OTP được gửi qua email.

## Tính Năng

✅ **Đăng Ký Người Dùng** - Tạo tài khoản mới với xác thực email  
✅ **Đăng Nhập** - Đăng nhập an toàn với mật khẩu được mã hóa  
✅ **Quên Mật Khẩu** - Yêu cầu đặt lại mật khẩu  
✅ **Xác Thực OTP** - Xác minh danh tính thông qua mã OTP  
✅ **Đặt Lại Mật Khẩu** - Đặt mật khẩu mới an toàn  
✅ **Giao Diện Đẹp** - Thiết kế responsive và hiện đại  

## Công Nghệ Sử Dụng

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB (Mongoose)** - Database (local MongoDB with Mongoose ODM)
- **Bcryptjs** - Mã hóa mật khẩu
- **Nodemailer** - Gửi email OTP
- **Dotenv** - Quản lý biến môi trường

### Frontend
- **HTML5** - Markup
- **CSS3** - Styling
- **JavaScript (Vanilla)** - Interactivity

## Cấu Trúc Dự Án

```
Forgot_OTP/
├── database/
│   └── db.js                 # Cấu hình database SQLite
├── controllers/
│   └── authController.js     # Logic xác thực
├── routes/
│   └── auth.js              # API routes
├── utils/
│   ├── email.js             # Gửi email OTP
│   └── helpers.js           # Hàm trợ giúp
├── public/
│   ├── css/
│   │   └── style.css        # Stylesheet
│   ├── js/
│   │   ├── login.js         # Login form logic
│   │   ├── register.js      # Register form logic
│   │   ├── forgot-password.js # Forgot password logic
│   │   ├── verify-otp.js    # OTP verification logic
│   │   ├── reset-password.js # Reset password logic
│   │   ├── dashboard.js     # Dashboard logic
│   │   └── home.js          # Home page logic
│   ├── index.html           # Trang chủ
│   ├── login.html           # Trang đăng nhập
│   ├── register.html        # Trang đăng ký
│   ├── forgot-password.html # Trang quên mật khẩu
│   ├── verify-otp.html      # Trang xác thực OTP
│   ├── reset-password.html  # Trang đặt lại mật khẩu
│   └── dashboard.html       # Trang dashboard
├── package.json
├── .env                      # Biến môi trường
├── .env.example             # Ví dụ biến môi trường
└── server.js                # Entry point
```

## Cài Đặt

### 1. Clone hoặc tải dự án
```bash
cd c:\20252026\Term2\CongNghePhanMemMoi\Forgot_OTP
```

### 2. Cài đặt Dependencies
```bash
npm install
```

### 3. Cấu Hình File .env

Sao chép nội dung `.env.example` hoặc tạo file `.env` với nội dung:

```
MONGO_URI=mongodb://<username>:<password>@localhost:27017/ForgotPassword?authSource=admin
PORT=3000
NODE_ENV=development

# Email Configuration (Gmail)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# OTP Configuration
OTP_EXPIRY=600
OTP_LENGTH=6

# JWT Configuration
JWT_SECRET=your_secret_key_here
```

### Lấy Gmail App Password

1. Truy cập: https://myaccount.google.com/security
2. Bật "2-Step Verification"
3. Tìm "App passwords"
4. Chọn "Mail" và "Windows Computer"
5. Copy password và dán vào `.env`

**Hoặc** sử dụng dịch vụ email khác bằng cách thay đổi `EMAIL_SERVICE` trong `.env`

### 4. Chạy Ứng Dụng

#### Development Mode (với auto-reload)
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

Ứng dụng sẽ chạy tại: **http://localhost:3000**

## Sử Dụng

### Quy Trình Quên Mật Khẩu

1. **Đến trang Quên Mật Khẩu**
   - Nhập email của bạn
   - Click "Gửi Mã OTP"

2. **Nhận OTP Qua Email**
   - Kiểm tra email của bạn
   - Lấy mã OTP (6 chữ số)

3. **Xác Thực OTP**
   - Nhập mã OTP
   - Click "Xác Nhận"

4. **Đặt Lại Mật Khẩu**
   - Nhập mật khẩu mới
   - Xác nhận mật khẩu
   - Click "Đặt Lại Mật Khẩu"

5. **Đăng Nhập Lại**
   - Sử dụng email và mật khẩu mới

## API Endpoints

### POST `/api/auth/register`
Đăng ký người dùng mới
```json
{
  "email": "user@gmail.com",
  "password": "password123",
  "fullName": "Người Dùng",
  "phone": "0123456789"
}
```

### POST `/api/auth/login`
Đăng nhập
```json
{
  "email": "user@gmail.com",
  "password": "password123"
}
```

### POST `/api/auth/forgot-password`
Yêu cầu đặt lại mật khẩu
```json
{
  "email": "user@gmail.com"
}
```

### POST `/api/auth/verify-otp`
Xác thực mã OTP
```json
{
  "email": "user@gmail.com",
  "otp": "123456"
}
```

### POST `/api/auth/reset-password`
Đặt lại mật khẩu
```json
{
  "email": "user@gmail.com",
  "token": "reset_token_here",
  "newPassword": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

## Database

This project now uses MongoDB with Mongoose. Schemas are defined in the `models/` directory:

- `models/User.js` - users collection
- `models/Otp.js` - otps collection
- `models/PasswordReset.js` - password_resets collection

If you prefer to use authentication for MongoDB, set `MONGO_URI` in `.env` with a username and password. The default example uses a local user named `users` with the password `014789` and database `ForgotPassword` on port 27017.

## Bảo Mật

🔒 **Mã Hóa Mật Khẩu** - Sử dụng bcryptjs  
🔒 **OTP Hết Hạn** - OTP có hiệu lực 10 phút  
🔒 **Token Reset** - Token có hiệu lực 30 phút  
🔒 **Email Verification** - Xác minh email thông qua OTP  
🔒 **Biến Môi Trường** - Thông tin nhạy cảm trong `.env`

## Khắc Phục Sự Cố

### Email không được gửi
- Kiểm tra cấu hình Gmail
- Bật "Less secure app access"
- Sử dụng Gmail App Password

### OTP không nhận được
- Kiểm tra thư Spam
- Xác minh email trong `.env`
- Kiểm tra Internet connection

### Error khi kết nối database
- Xóa file `database/app.db`
- Khởi động lại server
- Database sẽ được tạo lại tự động

## Tùy Chỉnh

### Thay đổi thời gian OTP
Sửa trong `.env`:
```env
OTP_EXPIRY=600  # 600 giây = 10 phút
```

### Thay đổi độ dài OTP
Sửa trong `.env`:
```env
OTP_LENGTH=6    # 6 chữ số
```

### Thay đổi dịch vụ email
Sửa trong `.env` và chọn từ danh sách Nodemailer.

## Liên Hệ & Hỗ Trợ

Nếu bạn gặp vấn đề, vui lòng:
1. Kiểm tra lại cấu hình `.env`
2. Xem lại console để tìm lỗi
3. Đảm bảo tất cả dependencies được cài đặt

## License

MIT License - Tự do sử dụng cho mục đích cá nhân hoặc thương mại.

---

**Happy Coding! 🚀**
