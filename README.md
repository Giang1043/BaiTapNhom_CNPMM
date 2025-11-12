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

### 1. Đường Dẫn Dự Án
```bash
C:\20252026\Term2\CongNghePhanMemMoi\Forgot_OTP_Yarn
```

### 2. Yêu Cầu Hệ Thống
- **Node.js** (v14 hoặc cao hơn)
- **MongoDB** (phiên bản địa phương hoặc cloud)
- **Yarn** (package manager)

### 3. Cài đặt Dependencies
```bash
cd C:\20252026\Term2\CongNghePhanMemMoi\Forgot_OTP_Yarn
yarn install
```

### 4. Cấu Hình File .env

Tạo file `.env` trong thư mục gốc với nội dung sau:

```
# Database Configuration
MONGO_URI=mongodb://localhost:27017/ForgotPassword
PORT=3000
NODE_ENV=development

# Email Configuration (Gmail)
EMAIL_SERVICE=gmail
EMAIL_USER=bachhoaxanhdev@gmail.com
EMAIL_PASSWORD=vnydvdhrrwteusvo

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

#### Development Mode (với auto-reload bằng nodemon)
```bash
yarn dev
```

#### Production Mode
```bash
yarn start
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

Dự án sử dụng **MongoDB** với **Mongoose** ODM.

### Cấu Hình MongoDB

#### Phương Thức 1: MongoDB Địa Phương (Local)

1. **Cài đặt MongoDB Community Edition**
   - Tải từ: https://www.mongodb.com/try/download/community
   - Cài đặt mặc định trên `C:\Program Files\MongoDB`

2. **Khởi động MongoDB Server**
   ```bash
   # Mở PowerShell as Administrator
   cd "C:\Program Files\MongoDB\Server\7.0\bin"
   mongod.exe
   ```
   - Hoặc nếu cài dưới dạng Service, nó sẽ tự chạy

3. **Cấu hình .env**
   ```
   MONGO_URI=mongodb://localhost:27017/ForgotPassword
   ```

#### Phương Thức 2: MongoDB Cloud (Atlas)

1. Tạo tài khoản tại: https://www.mongodb.com/cloud/atlas
2. Tạo cluster và lấy connection string
3. Cấu hình .env:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ForgotPassword
   ```

### Các Collection (Schema)

Dự án sử dụng các model sau:

- **User.js** - Lưu trữ thông tin người dùng
  ```
  email, password (mã hóa), fullName, phone, createdAt
  ```

- **Otp.js** - Lưu trữ mã OTP tạm thời
  ```
  email, otp, expiresAt
  ```

- **PasswordReset.js** - Lưu trữ token reset mật khẩu
  ```
  email, token, expiresAt
  ```

## Tài Khoản & Email Test

### Email Gửi OTP
```
EMAIL_USER=bachhoaxanhdev@gmail.com
EMAIL_PASSWORD=vnydvdhrrwteusvo
```

### Tài Khoản Test (Mẫu)
Sau khi cài đặt, bạn có thể tạo tài khoản mới hoặc sử dụng:
```
Email: test@example.com
Password: Test@123456
```

### Lưu Ý Về Gmail
- App Password được sử dụng (không phải mật khẩu Gmail thường)
- Chỉ hoạt động khi bật 2-Factor Authentication trên Gmail
- Nếu thay đổi, cần cập nhật lại `.env`

## Yarn Commands

### Cài đặt packages
```bash
yarn install
```

### Chạy ứng dụng (Development)
```bash
yarn dev
```
- Sử dụng `nodemon` để tự động reload khi có thay đổi code
- Giúp phát triển nhanh hơn

### Chạy ứng dụng (Production)
```bash
yarn start
```
- Chạy node server trực tiếp
- Dùng cho môi trường production

### Xem tất cả scripts
```bash
yarn run
```

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
