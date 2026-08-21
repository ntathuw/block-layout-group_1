# GitHub Library — Block Layout

Bài tập Block Layout: vẽ block layout (tay + draw.io) cho mobile & desktop, sau đó code HTML/CSS bám đúng layout.

**Deadline:** 10/08/2026

---

## Thành viên

| Vai | Họ tên | GitHub | Email |
|---|---|---|---|
| Leader | Anh Thư | @ntathuw | ntathuw5@gmail.com |
| Dev | Minh Phúc |  _(điền) | trminhphuc1504@gmail.com |
| Dev | Nguyên Phúc | _(điền)_ | phamhuunguyenphuc2007@gmail.com |
---

## Cấu trúc thư mục

```
.
├── README.md
├── CONTRIBUTING.md            # quy ước nhánh + commit
├── .gitignore
├── docs/
│   ├── block-list.md          # danh sách block + naming (nguồn sự thật)
│   └── meeting-minutes/       # biên bản họp mỗi buổi
├── design/
│   └── v2/
│       ├── hand/              # ảnh chụp bản vẽ tay
│       ├── drawio/            # file .drawio gốc + PNG export
│       └── CHANGELOG.md
├── ai-history/
│   ├── REPORT.md              # báo cáo tổng hợp cuối
│   ├── prompt-library.md      # prompt chuẩn nhóm chốt dùng
│   └── logs/                  # mỗi lần dùng AI = 1 file
└── src/
    ├── index.html
    ├── css/style.css
    └── assets/
```

---

## Xem layout

| Phiên bản | Mobile | Desktop | File gốc |
|---|---|---|---|
| v2 | `design/v2/hand/mobile-v2.jpg` · `design/v2/drawio/mobile-v2.png` | `design/v2/hand/desktop-v2.jpg` · `design/v2/drawio/desktop-v2.png` | `design/v2/drawio/Blocklayout-BEM-Github(v2).drawio` |

Danh sách block và quy ước đặt tên: [`docs/block-list.md`](docs/block-list.md)

---

## Cách chạy

Trang `index.html` mở trực tiếp được. Trang **login** lưu dữ liệu + session trong
`localStorage` → chỉ cần host tĩnh.

```bash
npx http-server src -p 8000
# → http://localhost:8000/login.html
# → http://localhost:8000/index.html
```

> `npx` tải `http-server` một lần (cần internet lần đầu). Không cần server code riêng.

### Login (tái hiện đơn giản)

- **Đọc:** `login.js` dùng `XMLHttpRequest` (callback) đọc `js/data/user.txt`,
  `js/data/account.txt` (bắt buộc).
- **Session:** đăng nhập thành công → `Account` lưu session vào `localStorage` (key `session`).
- **Check:** sau login, `localStorage.getItem('session')` chứa JSON mảng phiên đăng nhập.
- **Tài khoản test:** `khanh`/`khanh123`, `phuc`/`phuc123` (role `user`).
  `admin`/`admin123` bị chặn (role `admin`).

---

## Quy ước commit

Xem đầy đủ ở [`CONTRIBUTING.md`](CONTRIBUTING.md). Tóm tắt:

```
<type>: <mô tả ngắn, tiếng Anh>

types: design | feat | fix | refactor | docs | chore
```

> ⚠️ **Luật quan trọng nhất:** commit bản vẽ (tay + draw.io) **phải đứng trước** mọi commit code trong `src/`.
> Không ai được commit vào `src/` khi tag `design-v1` chưa tồn tại.

---

## Tài liệu khác

- Biên bản họp: [`docs/meeting-minutes/`](docs/meeting-minutes/)
- Lịch sử dùng AI: [`ai-history/REPORT.md`](ai-history/REPORT.md)
- Thư viện prompt: [`ai-history/prompt-library.md`](ai-history/prompt-library.md)
