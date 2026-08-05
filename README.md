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
│   ├── v1/
│   │   ├── hand/              # ảnh chụp bản vẽ tay
│   │   ├── drawio/            # file .drawio gốc + PNG export
│   │   └── CHANGELOG.md
│   └── v2/                    # chỉ dùng khi phải sửa layout
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
| v1 | `design/v1/hand/mobile-v1.jpg` · `design/v1/drawio/mobile-v1.png` | `design/v1/hand/desktop-v1.jpg` · `design/v1/drawio/desktop-v1.png` | `design/v1/drawio/layout-v1.drawio` |
| v2 | _(nếu có)_ | _(nếu có)_ | _(nếu có)_ |

Danh sách block và quy ước đặt tên: [`docs/block-list.md`](docs/block-list.md)

---

## Cách chạy

Không cần build. Mở trực tiếp:

```
src/index.html
```

Hoặc chạy server tĩnh cho tiện:

```bash
cd src && python -m http.server 8000
# → http://localhost:8000
```

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
