# Website Cá Nhân - Đồng Minh Phú

Website cá nhân (Portfolio) được xây dựng với **Next.js 14**, **Tailwind CSS**, và **Framer Motion**.

## 🚀 Hướng dẫn Chạy Dự Án

### 1. Cài đặt thư viện (nếu chưa làm)
Chạy lệnh sau để cài đặt các gói cần thiết:

**Nếu bạn dùng PowerShell và gặp lỗi `...running scripts is disabled...`**:
Hãy dùng lệnh này thay thế:
```bash
cmd /c npm install
```

Hoặc lệnh gốc:
```bash
npm install
```

### 2. Chạy Server Development
Để bắt đầu chạy web trên máy tính của bạn:
```bash
cmd /c npm run dev
```

Sau khi chạy, hãy mở trình duyệt và truy cập: [http://localhost:3000](http://localhost:3000)

## 🛠️ Cấu trúc Dự Án

- `app/`: Chứa các trang (page) và layout chính.
  - `page.tsx`: Trang chủ.
  - `about/`: Trang Về tôi.
  - `portfolio/`: Trang Dự án.
  - `blog/`: Trang Blog.
  - `contact/`: Trang Liên hệ.
- `components/`: Các thành phần giao diện dùng chung (Header, Footer).
- `lib/`: Các hàm tiện ích (utils).
- `public/`: Chứa hình ảnh tĩnh.

## 🎨 Tùy chỉnh Giao diện
- Các biến màu sắc (Navy, Gold...) được định nghĩa trong `app/globals.css`.
- Cấu hình Tailwind nằm trong `tailwind.config.ts`.
