# Block List & Naming Convention — GitHub Library

> Chốt trong MOM-02 ngày 06/08/2026. 

## Quy ước đặt tên

Dùng **BEM**, kebab-case, tiếng Anh.

| Loại | Cú pháp | Ví dụ |
|---|---|---|
| Block | `.block` | `.repo-card` |
| Element | `.block__element` | `.repo-card__title` |
| Modifier | `.block--modifier` | `.repo-card--mobile` · `.repo-card__badge--public` |

- Chỉ 1 cấp element: `.repo-card__title` ✅ — `.repo-card__header__title` ❌
- Modifier luôn đi kèm class gốc: `class="repo-card repo-card--mobile"`
- Không tự chế block ngoài danh sách dưới

---

## Danh sách block

| # | Block | Vai trò | Desktop | Mobile |
|---|---|---|---|---|
| 1 | `.site-header` | Thanh đầu trang | flex, logo + nav + avatar | logo + hamburger |
| 2 | `.page-title` | Tiêu đề trang | heading + count cùng hàng | gộp 1 dòng, font nhỏ hơn |
| 3 | `.popular-repos` | Khối "Popular repositories" | grid 2 cột | xếp dọc 1 cột |
| 4 | `.search-bar` | Ô tìm kiếm | input + nút filter | chỉ input |
| 5 | `.main-layout` | Container 2 cột | `flex-direction: row` | `flex-direction: column` |
| 6 | `.sidebar-filter` | Bộ lọc | cột trái 25%, 3 nhóm mở sẵn | full width, thu gọn + nút toggle |
| 7 | `.repo-list` / `.repo-card` | Danh sách repo | cột phải 75% | full width |
| 8 | `.pagination` | Phân trang | đầy đủ số trang | rút gọn (1 … 5) |
| 9 | `.site-footer` | Chân trang | link hàng ngang | link xếp dọc |

---

## Bảng tra nhanh — toàn bộ class

```
.site-header                    .site-header--mobile
  .site-header__logo
  .site-header__nav
  .site-header__avatar
  .site-header__hamburger

.page-title                     .page-title--mobile
  .page-title__heading
  .page-title__count

.popular-repos                  .popular-repos--mobile
  .popular-repos__list
  .popular-card
    .popular-card__title
    .popular-card__badge--public
    .popular-card__description
    .popular-card__meta

.search-bar                     .search-bar--mobile
  .search-bar__input
  .search-bar__filter-btn

.main-layout

.sidebar-filter                 .sidebar-filter--mobile
  .sidebar-filter__group
  .sidebar-filter__toggle-btn

.repo-list
  .repo-card                    .repo-card--mobile
    .repo-card__header
    .repo-card__title
    .repo-card__badge--public
    .repo-card__description
    .repo-card__meta

.pagination                     .pagination--mobile
  .pagination__btn--prev
  .pagination__item
  .pagination__btn--next

.site-footer                    .site-footer--mobile
  .site-footer__links
  .site-footer__copyright
```

---

