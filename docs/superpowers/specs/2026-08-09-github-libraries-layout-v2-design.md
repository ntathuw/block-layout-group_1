# Spec: GitHub Libraries — Chỉnh layout khớp bản gốc + chuyển bản vẽ v2

## 1. Mục tiêu

Đưa bản clone `src/index.html` + `src/css/style.css` gần giao diện GitHub gốc theo 5 thay đổi đã duyệt:

1. Gộp `.sub-nav` vào block `.header` (header chứa `.site-header` và `.sub-nav`).
2. Thay block `.sidebar-info` bằng `.right-info` với nội dung đầy đủ như ảnh gốc.
3. Footer căn giữa, có gap, bổ sung link gốc.
4. Chuyển toàn trang sang dark theme theo GitHub.
5. Thay bản vẽ `design/v1/` bằng `design/v2/` (file `.drawio` + PNG đã chỉnh class), cập nhật tài liệu tham chiếu.

Nguồn chuẩn cũ `E:\...\block-layout-group_1\design\v1\drawio\Blocklayout-BEM-Github(v2).drawio` được copy về `design/v2/drawio/` của repository này.

## 2. Hợp đồng class

Class set **không đổi ngoài việc đổi tên nhánh `.sidebar-info*` → `.right-info*`**:

| Cũ | Mới |
|---|---|
| `sidebar-info` | `right-info` |
| `sidebar-info_people` | `right-info_people` |
| `sidebar-info__heading` | `right-info__heading` |
| `sidebar-info__description` | `right-info__description` |
| `sidebar-info__meta` | `right-info__meta` |

Không thêm element BEM mới. Dòng ngôn ngữ dùng lại `right-info__meta`; link Report abuse được style bằng selector element (`.right-info a`). Toàn bộ class còn lại trong `docs/superpowers/specs/2026-08-09-github-libraries-html-css-design.md` giữ nguyên.

## 3. Thay đổi chi tiết

### 3.1 Header
- Chuyển `<nav class="sub-nav">` (kèm `details/summary` cho mobile) vào trong `<header class="header">`, ngay sau `<div class="site-header">`.
- Không đổi class header, không đổi cách `.site-header` bố trí các control. `.sub-nav` giữ nền trắng + viền dưới, container 1200px.

### 3.2 Block `.right-info`
- `<aside class="sidebar-info">` → `<aside class="right-info">`; các element con đổi tên theo bảng ở mục 2.
- Bỏ kiểu card (nền `--surface-muted`, viền, bo góc, padding). Trở thành cột phải phẳng với các mục cách nhau bởi đường phân cách mảnh.
- Nội dung theo ảnh gốc:
  - **People**: icon người (`.right-info_people`), `__heading` "People", `__description`, `__meta` (số người đóng góp).
  - Đường phân cách.
  - **Top languages**: `__heading` "Top languages" + danh sách 4 ngôn ngữ, mỗi dòng `<li class="right-info__meta">` gồm chấm màu + tên ngôn ngữ.
  - Liên kết **Report abuse** style muted, class không bắt buộc (dùng `.right-info a`).

### 3.3 Footer
- `.site-footer`: bỏ `justify-content: space-between`, chuyển sang căn giữa (`justify-content: center`) với gap gọn giữa logo, copyright, links.
- Thêm link vào `.site-footer__links`: `Community`, `Docs`, `Contact`, `Manage cookies`, `Do not share my personal information`; giữ `Terms`, `Privacy`, `Security`, `Status`, `Help`.
- Mobile vẫn xếp dọc như hiện tại.

### 3.4 Dark theme
- Đổi toàn bộ token trong `:root` sang dark theme theo GitHub: nền tối, surface tối, chữ sáng, viền tối, link sáng. Giữ `:focus-visible`, contrast đọc được, không đổi cấu trúc DOM.

### 3.5 Bản vẽ v2 + tài liệu
- Sửa file gốc v2 (`Blocklayout-BEM-Github(v2).drawio` + export `Blocklayout-BEM-Github(V2).drawio.png`): đổi mọi nhãn `.sidebar-info`, `.sidebar-info_people`, `.sidebar-info__heading`, `.sidebar-info__description`, `.sidebar-info__meta` thành tên `.right-info*` tương ứng. Cấu trúc header trong bản vẽ đã thể hiện `.header` bao gồm `.site-header` và `.sub-nav` nên chỉ đổi nhãn class, không di chuyển block.
- Copy `.drawio` và `.png` vào `design/v2/drawio/` của repository này.
- **Xóa toàn bộ** `design/v1/` (đã được thay bằng v2) để tránh conflict.
- Cập nhật tài liệu đang tham chiếu v1/`.sidebar-info`:
  - `README.md`: bảng phiên bản layout + cấu trúc thư mục → v2.
  - `docs/block-list.md`: đổi tên block `sidebar-info*` → `right-info*`, ghi chú nguồn v2.
  - `docs/superpowers/specs/2026-08-09-github-libraries-html-css-design.md` và plan tương ứng: cập nhật inventory class và nguồn Draw.io v2.

## 4. Phạm vi ngoài lệ

- Không đổi các block còn lại (`.Page-title`, `.Profile-*`, `.popular-repos`, `.search-bar`, `.repo-list`, `.repo-card`, `.pagination`) trừ thay đổi màu dark theme.
- Không thêm class mới ngoài nhánh đổi tên `.right-info*`.
- Không dùng JavaScript, framework, tài nguyên ngoài, build step. Không đổi `CONTRIBUTING.md`, meeting minutes.

## 5. Verification

1. Mở `src/index.html`; header hiển thị 2 dòng liền nhau (site-header + sub-nav) trong cùng block header.
2. `.right-info` hiển thị People, phân cách, Top languages (4 dòng), Report abuse — không còn dạng card ngắn.
3. Footer căn giữa, gap gọn, đủ link mới.
4. Toàn trang dark theme đọc được, focus-visible rõ.
5. Quan sát 1200/768/767/375px: không overflow ngang, responsive giữ nguyên hành vi cũ.
6. `design/v2/drawio/` có `.drawio` + `.png`, `design/v1/` đã xóa; mọi nhãn `.sidebar-info*` trong drawio đã đổi tên.
7. `git diff --check` không báo lỗi; không có request tài nguyên ngoài.

## 6. Acceptance checklist nhị phân

- [ ] `.sub-nav` nằm trong `<header class="header">` sau `.site-header` trong DOM.
- [ ] Mọi `sidebar-info*` trong `src/index.html` và `src/css/style.css` được đổi thành `right-info*` đúng hợp đồng.
- [ ] `.right-info` có People, phân cách, Top languages (4 dòng `right-info__meta`), Report abuse.
- [ ] Không có element BEM mới nào ngoài nhánh `right-info*`.
- [ ] Footer căn giữa, có gap, đủ link mới; mobile xếp dọc.
- [ ] `:root` token là dark theme; không còn nền/viền/chữ light.
- [ ] Responsive 1200/768/767/375px không overflow ngang.
- [ ] `design/v2/drawio/` chứa file v2 đã đổi tên class; `design/v1/` đã xóa.
- [ ] `README.md`, `docs/block-list.md`, spec/plan HTML-CSS tham chiếu v2 và `right-info`.
- [ ] `git diff --check` sạch; không tài nguyên ngoài, không JS/framework.
