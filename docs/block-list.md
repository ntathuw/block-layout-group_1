# Block List — GitHub Library

> **Đây là nguồn sự thật.** Bản vẽ tay, draw.io, class trong HTML và prompt gửi AI đều phải dùng đúng tên ở đây.
> Nguồn vẽ: `design/v2/drawio/Blocklayout-BEM-Github(v2).drawio` (desktop + mobile).

## Breakpoint

| Loại | Kích thước |
|---|---|
| Mobile | ≤ 767px (thiết kế ở 375px) |
| Desktop | ≥ 768px (container 1200px) |

## Inventory class (khớp Draw.io V2 + code thực tế)

### Layout shell
| Class | Ghi chú |
|---|---|
| `header` | bọc `site-header` + `sub-nav` |
| `site-header` | `__hamburger`, `__logo`, `__heading`, `__search`, `__search-bar`, `__nav`, `__avatar` |
| `site-header__nav-item` | element con của `__nav` (không có trên drawio, giữ) |
| `site-header__nav-dot` | chấm xanh inbox (không có trên drawio, giữ) |
| `sub-nav` | `sub-nav_nav1` (1 underscore, theo drawio), `sub-nav__nav2..5`, `sub-nav__hamburger` |
| `left-side` / `center` / `right-side` | cột khung |
| `main-layout` | flex cột trái + `right-info` |

### Profile
| Class | Ghi chú |
|---|---|
| `Page-title` | |
| `Profile-avatar` / `Profile-info` / `Profile-action` | |
| `Profile-info__heading` / `Profile-info__meta` | |
| `Profile-action__follow-btn` | |

### Popular repositories
| Class | Ghi chú |
|---|---|
| `popular-repos` | |
| `popular-repos__title` | |
| `popular-repos__card` | đổi tên từ `popularrepo-card` |
| `popular-repos__card__heading` | |
| `popular-repos__card__description` | |
| `popular-repos__card__meta` | |
| `popular-repos__card__badge` | |

### Repositories section
| Class | Ghi chú |
|---|---|
| `sub-heading` / `sub-heading__title` | |
| `search-bar` | `__icon`, `__input`, `__nav1`, `__nav2`, `__nav3` |
| `repo-list` | |
| `repo-card` | `__body`, `__header`, `__title`, `__description`, `__meta`, `__badge`, `__lang`, `__sparkline` |

### Right info (cột phải)
| Class | Ghi chú |
|---|---|
| `right-info` | sticky desktop |
| `right-info_people` | 1 underscore, không có trên drawio, giữ |
| `right-info__heading` / `right-info__description` / `right-info__meta` | |

### Footer
| Class | Ghi chú |
|---|---|
| `site-footer` | |
| `site-footer__logo` / `site-footer__copyright` / `site-footer__links` | |

### Utility
| Class | Ghi chú |
|---|---|
| `sr-only` | a11y |

## Đã xóa / không dùng

| Class | Lý do |
|---|---|
| `pagination` | design không có; đã xóa |
| `fitter-btn` | dư; chỉ còn `search-bar__nav3` |
| `sidebar-filter` | không dùng (block-list cũ) |
| `repo-card__desc` | gộp thành `repo-card__description` |

## Quy ước đặt tên

- kebab-case, tiếng Anh: `repo-card`, `search-bar`
- Phần tử con thêm hậu tố `__`: `repo-card__title`
- **Không tự chế block mới.** Cần block mới → nêu trong buổi họp, cập nhật file này trước, rồi mới code.
- Lệch chuẩn BEM thừa hưởng từ drawio v2 (giữ nguyên): `sub-nav_nav1` (1 `_`), `right-info_people` (1 `_`), `Page-title`, `Profile-*` (PascalCase).
