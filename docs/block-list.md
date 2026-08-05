# Block List — GitHub Library

> **Đây là nguồn sự thật.** Bản vẽ tay, draw.io, class trong HTML và prompt gửi AI đều phải dùng đúng tên ở đây.
> Chốt trong buổi họp MOM-01. Mọi thay đổi phải ghi vào `design/vX/CHANGELOG.md`.

## Breakpoint

| Loại | Kích thước |
|---|---|
| Mobile | ≤ 767px (thiết kế ở 375px) |
| Desktop | ≥ 768px (container 1200px) |

## Danh sách block

| # | Tên class | Nội dung chứa bên trong | Desktop | Mobile |
|---|---|---|---|---|
| 1 | `site-header` | logo, nav, avatar user | full width, cao ~64px | full width, gộp nav thành hamburger |
| 2 | `search-bar` | ô tìm kiếm, nút filter | full width trong container | full width, ẩn nút filter phụ |
| 3 | `page-title` | tiêu đề trang, số lượng repo | trái | trái, font nhỏ hơn |
| 4 | `sidebar-filter` | nhóm filter: language, type, sort | cột trái, 25% | xếp trên `repo-list`, full width, thu gọn |
| 5 | `repo-list` | danh sách `repo-card` | cột phải, 75% | full width, xếp dọc |
| 6 | `repo-card` | tên repo, mô tả, ngôn ngữ, sao, ngày cập nhật | 1 card / hàng | 1 card / hàng, padding nhỏ hơn |
| 7 | `pagination` | số trang, nút prev/next | căn giữa | căn giữa, rút gọn số trang |
| 8 | `site-footer` | link, copyright | full width, 3 cột | full width, xếp dọc |

## Quyết định layout

| # | Quyết định | Lý do |
|---|---|---|
| 1 | `sidebar-filter` nằm **bên trái**, chiếm 25% desktop | Giống GitHub gốc |
| 2 | Breakpoint 768px | Chuẩn phổ biến, khớp iPad dọc |
| 3 | Container 1200px, gutter 24px | Vừa màn hình 1366px trở lên |
| 4 | Dùng **flexbox**, không dùng grid | Thống nhất một kỹ thuật cho dễ review |

## Quy ước đặt tên

- kebab-case, tiếng Anh: `repo-card`, `sidebar-filter`
- Phần tử con thêm hậu tố: `repo-card__title`, `repo-card__meta`
- **Không tự chế block mới.** Cần block mới → nêu trong buổi họp, cập nhật file này trước, rồi mới code.

## Checklist đối chiếu (dùng ở GL-17)

| Block | Desktop khớp? | Mobile khớp? | Ghi chú |
|---|---|---|---|
| site-header | ☐ | ☐ | |
| search-bar | ☐ | ☐ | |
| page-title | ☐ | ☐ | |
| sidebar-filter | ☐ | ☐ | |
| repo-list | ☐ | ☐ | |
| repo-card | ☐ | ☐ | |
| pagination | ☐ | ☐ | |
| site-footer | ☐ | ☐ | |

---

> ⚠️ Bảng trên là **đề xuất khởi điểm**. Cả nhóm phải mở trang GitHub Library thật, đối chiếu và chốt lại trong MOM-01 trước khi Designer bắt đầu vẽ.
