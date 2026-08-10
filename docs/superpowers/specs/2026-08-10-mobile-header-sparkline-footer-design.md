# Spec: Mobile header / repo sparkline / footer — khớp bản gốc

## 1. Mục tiêu

Fix 3 vùng trên mobile (≤767px) khớp ảnh gốc:

1. Header mobile: ẩn nav icons; hiện icon search tròn; giữ avatar tròn.
2. Repo-card: sparkline nằm giữa description và meta (mobile); desktop sparkline phải.
3. Footer mobile: order links → logo → copyright; căn giữa, gap gọn.

## 2. Thay đổi

### 2.1 Header mobile

- DOM `.site-header__search`: giữ icon SVG + input. Mobile: ẩn input, hiện icon trong nút tròn 32px (border `#484f58`, radius 50%).
- Ẩn toàn bộ `.site-header__nav` trên mobile (không còn Inbox).
- Avatar `.site-header__avatar` giữ tròn (initials), không đổi.
- Bỏ rule cũ `.site-header__search, .site-header__search-bar { display:none }`.

### 2.2 Repo-card sparkline

- DOM: chuyển `<svg class="repo-card__sparkline">` từ sibling `.repo-card__body` vào trong body, **giữa** `.repo-card__description` và `.repo-card__meta`.
- Desktop (≥768px): sparkline `position: absolute; right: 20px; top: 50%; translate 0 -50%` trong `.repo-card` (đặt `position: relative`).
- Mobile: sparkline `position: static`, `align-self: flex-start`, margin-bottom 8px, width 100%/max 120px.

### 2.3 Footer mobile

- `.site-footer` column center (giữ).
- Thêm `order`: `.site-footer__links` = 1, `.site-footer__logo` = 2, `.site-footer__copyright` = 3.
- Links wrap center, gap gọn (giữ hiện tại).

## 3. Files

- `src/index.html` — reorder sparkline (3 card)
- `src/css/style.css` — media query + desktop sparkline

## 4. Ngoài phạm vi

- Không đổi data repo, desktop header icons, sub-nav, BEM.
- Không JS / asset ngoài.

## 5. Acceptance

- [ ] Mobile header: hamburger | logo | libraries | search tròn | avatar; không nav icons.
- [ ] Repo mobile: desc → sparkline → meta; desktop: sparkline phải.
- [ ] Footer mobile: links → logo → ©.
- [ ] `git diff --check` sạch.
