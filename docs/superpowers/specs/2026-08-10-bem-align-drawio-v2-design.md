# Spec: Align BEM names với Draw.io V2

## 1. Mục tiêu

Rename class trong `src/index.html` + `src/css/style.css` cho khớp nguồn chuẩn `design/v2/drawio` (desktop + mobile). Giữ 3 class ngoài drawio đã chốt. Không đổi visual/layout.

## 2. Nguồn chuẩn

`design/v2/drawio/Blocklayout-BEM-Github(v2).drawio` + `.png`

## 3. Rename bắt buộc

| Hiện tại | Mục tiêu (Draw.io V2) |
|---|---|
| `popularrepo-card` | `popular-repos__card` |
| `popularrepo-card__heading` | `popular-repos__card__heading` |
| `popularrepo-card__description` | `popular-repos__card__description` |
| `popularrepo-card__meta` | `popular-repos__card__meta` |
| `popularrepo-card__badge` | `popular-repos__card__badge` |
| `repo-card__desc` | `repo-card__description` |
| `fitter-btn` | xóa (chỉ còn `search-bar__nav3`) |

## 4. Giữ nguyên

Layout shell: `header`, `site-header*`, `sub-nav` / `sub-nav_nav1` / `__nav2–5`, `Page-title`, `Profile-*`, `left-side` / `center` / `right-side`, `main-layout`, `repo-list`, `right-info*`, `site-footer*`.

Header/Repo extras: `site-header__search`, `site-header__nav-item`, `site-header__nav-dot`, `repo-card__body`, `repo-card__title`, `repo-card__lang`, `repo-card__sparkline`.

Ngoài drawio — giữ (đã chốt): `right-info_people`, `repo-card__title`, `repo-card__body`.

Utility: `sub-nav__hamburger`, `sr-only`.

## 5. Files chạm

- `src/index.html` — replace class names
- `src/css/style.css` — replace selectors (kể cả media)
- `docs/block-list.md` — inventory khớp drawio V2

## 6. Ngoài phạm vi

- Không đổi DOM layout (main-layout vẫn bọc cột trái + right-info)
- Không đổi visual/màu/sticky/footer/header icons
- Không sửa file drawio

## 7. Acceptance

- [ ] Không còn `popularrepo-card*` / `repo-card__desc` / `fitter-btn` trong `src/`
- [ ] Mọi selector CSS trỏ tên mới; visual không đổi
- [ ] `right-info_people`, `repo-card__title`, `repo-card__body` vẫn còn
- [ ] `docs/block-list.md` cập nhật inventory
- [ ] `git diff --check` sạch
