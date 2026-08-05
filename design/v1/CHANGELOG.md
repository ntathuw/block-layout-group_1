# Design v1 — Changelog

- **Ngày tạo:** __/08/2026
- **Người vẽ:** _(tên)_
- **Trạng thái:** ⬜ Đang vẽ / ⬜ Đã review / ⬜ Đã freeze (tag `design-v1`)

## Phạm vi

Bản vẽ đầu tiên cho cả 2 kích thước:

- `hand/mobile-v1.jpg` — vẽ tay, khung 375×812
- `hand/desktop-v1.jpg` — vẽ tay, khung 1200px
- `drawio/layout-v1.drawio` — file gốc, 2 page Mobile + Desktop
- `drawio/mobile-v1.png`, `drawio/desktop-v1.png` — export

## Danh sách block trong bản vẽ

Đúng 8 block theo `docs/block-list.md`:

`site-header` · `search-bar` · `page-title` · `sidebar-filter` · `repo-list` · `repo-card` · `pagination` · `site-footer`

## Quyết định layout & lý do

| # | Quyết định | Lý do |
|---|---|---|
| 1 | `sidebar-filter` bên trái, 25% desktop | Giống GitHub gốc, mắt người đọc quét filter trước |
| 2 | Breakpoint 768px | Chuẩn phổ biến, khớp iPad dọc |
| 3 | Dùng flexbox thay vì grid | Cả nhóm quen flexbox hơn, dễ review chéo |
| 4 | _(điền thêm)_ | |

## Chưa chốt / rủi ro

- _(ví dụ: chưa quyết `sidebar-filter` trên mobile là ẩn hẳn hay thu gọn thành accordion)_

## Ai đã review

| Người | Ngày | Kết luận |
|---|---|---|
| | | ☐ Đồng ý ☐ Cần sửa |
| | | ☐ Đồng ý ☐ Cần sửa |
