# Biến "Sổ Tài Chính" thành app cài được trên điện thoại (PWA)

File `finance_app.html` giờ đã kèm đầy đủ những gì cần để trở thành một
**PWA (Progressive Web App)** — cài vào màn hình chính, mở lên chạy toàn
màn hình, **không còn thanh địa chỉ trình duyệt**, có icon riêng như app
thật. Đi kèm là 3 file mới: `manifest.webmanifest`, `sw.js`, và các file
icon (`icon-192.png`, `icon-512.png`, `icon-maskable-512.png`,
`apple-touch-icon.png`).

**Quan trọng:** cách này KHÔNG hoạt động nếu bạn chỉ mở file `.html` trực
tiếp từ máy (đường dẫn kiểu `file://...`) — Chrome chỉ cho "cài app" khi
trang được tải qua **HTTPS**. Vì vậy bạn cần host cả 7 file này (giữ
nguyên tên, cùng một thư mục) lên một nơi có HTTPS. Hai cách dễ nhất, miễn
phí, không cần biết code:

## Cách 1 — Netlify Drop (nhanh nhất, không cần tài khoản để thử)
1. Vào https://app.netlify.com/drop bằng trình duyệt.
2. Kéo thả cả thư mục chứa 7 file trên vào khung trên trang.
3. Vài giây sau bạn có ngay một URL dạng `https://ten-ngau-nhien.netlify.app`.
4. (Nên làm) Tạo tài khoản Netlify miễn phí để "claim" site này lại — nếu
   không, site demo có thể bị dọn sau một thời gian.

## Cách 2 — GitHub Pages (bền hơn, cần tài khoản GitHub)
1. Tạo một repository mới trên GitHub, đẩy (push) 7 file trên vào.
2. Vào Settings > Pages, chọn nhánh chứa code, Save.
3. GitHub cho bạn một URL dạng `https://ten-ban.github.io/ten-repo/`.

## Sau khi có URL HTTPS

1. Mở URL đó bằng **Chrome trên điện thoại Android**.
2. Chrome sẽ tự hiện gợi ý "Cài đặt ứng dụng" / "Add to Home screen" (hoặc
   vào menu ⋮ > "Cài đặt ứng dụng").
3. Bấm cài — icon sẽ xuất hiện trên màn hình chính, mở lên là toàn màn
   hình, không có thanh trình duyệt, giống hệt app thật.

## Muốn có hẳn file .apk để cài thủ công / gửi cho người khác?

Sau khi đã có URL HTTPS ở trên, vào https://www.pwabuilder.com, dán URL
vào, bấm **Start**. PWABuilder (công cụ chính thức của Microsoft) sẽ quét
manifest + service worker rồi cho bạn bấm **Package for Stores > Android**
để tải về một file `.apk` cài trực tiếp lên điện thoại — không cần cài
Android Studio hay biết lập trình. Đây là cách nhanh nhất nếu bạn muốn có
đúng một file `.apk` cầm tay.

Nếu muốn một app Android "gốc" thật sự, chạy được cả khi không host ở đâu
(mọi thứ đóng gói sẵn trong app), xem thư mục `capacitor_project` đi kèm —
đó là hướng dùng Android Studio tự build, không cần bước host ở trên.
