# Site-header: search-bar + nav icons + full-bleed — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Sửa `.site-header` cho khớp GitHub gốc: 1 search-bar, cụm icon `.site-header__nav` kề avatar, header full-bleed sát trái/phải.

**Architecture:** Chỉ sửa `src/index.html` + `src/css/style.css`. Không JS, không asset ngoài — icon SVG inline. Class mới duy nhất: `site-header__nav` (và con nếu cần theo BEM phẳng).

**Tech Stack:** HTML + CSS thuần.

## Global Constraints

- Không thêm framework / network asset / JS.
- Giữ dark theme hiện có.
- Class contract cũ giữ nguyên trừ: thêm `site-header__nav`; bỏ lặp search (chỉ 1 `.site-header__search-bar`).
- Header full-bleed như ảnh gốc (image-3): không `max-width: 1200px` + `margin: 0 auto` trên `.site-header` / hàng sub-nav nếu làm header co giữa.
- Commit: `fix: site-header full-bleed search + nav icons`.

---

## Vấn đề hiện tại (đối chiếu ảnh)

| | Clone (image-2) | Gốc GitHub (image-3) |
|---|---|---|
| Chiều ngang | Nội dung header bị max 1200px, hai bên trống | Sát mép trái + phải |
| Search | Label "Search GitHub" + input (nhìn như 2 control) | 1 ô search compact bên phải |
| Bên phải avatar | Chỉ avatar | Cụm icon (image-1) rồi avatar |
| Sub-nav | Căn giữa container | Full-bleed, tab sát trái |

**image-1 — thứ tự icon (trái → phải, kề avatar):**

1. Copilot (2 avatar + chevron xuống)
2. Create `+` (chevron xuống)
3. Issues (vòng tròn)
4. Pull requests (2 mũi tên)
5. Inbox / notifications (hộp thư) — có chấm xanh status
6. Avatar user (cuối cùng, đã có `.site-header__avatar`)

---

### Task 1: HTML — cấu trúc site-header

**Files:**
- Modify: `src/index.html` (khối `.site-header`, khoảng dòng 11–33)

**Thứ tự DOM mục tiêu (trái → phải):**

```text
.site-header__hamburger
.site-header__logo
.site-header__heading          ("libraries" / "Libraries")
.site-header__icon             (icon repo — giữ nếu drawio còn; gốc GitHub không có giữa logo–search)
.site-header__search-bar       (1 input only — BỎ label text "Search GitHub")
.site-header__nav              (cụm icon mới)
.site-header__avatar
```

- [ ] **Step 1: Bỏ label lặp**

Hiện:

```html
<label>
  Search GitHub
  <input class="site-header__search-bar" type="search" placeholder="Type / to search" aria-label="Search GitHub">
</label>
```

Đổi thành (1 control, accessible name qua `aria-label`):

```html
<input class="site-header__search-bar" type="search" placeholder="Type / to search" aria-label="Search GitHub">
```

- [ ] **Step 2: Thêm `.site-header__nav` trước avatar**

```html
<nav class="site-header__nav" aria-label="User menu">
  <!-- 5 nút icon theo image-1; SVG inline; decorative aria-hidden -->
  <button type="button" class="site-header__nav-item" aria-label="Copilot">…svg…</button>
  <button type="button" class="site-header__nav-item" aria-label="Create new">…svg…</button>
  <button type="button" class="site-header__nav-item" aria-label="Issues">…svg…</button>
  <button type="button" class="site-header__nav-item" aria-label="Pull requests">…svg…</button>
  <button type="button" class="site-header__nav-item" aria-label="Notifications">…svg…</button>
</nav>
<span class="site-header__avatar" …>GH</span>
```

**Class note:**
- Block mới: `site-header__nav` (user yêu cầu).
- Element con: `site-header__nav-item` (BEM phẳng; nếu muốn tối thiểu tuyệt đối có thể style `.site-header__nav button` không class — nhưng `site-header__nav-item` rõ hơn khi review).
- Không dùng class `site-header__search-bar` lần 2.
- Không thêm class ngoài `site-header__nav` / `site-header__nav-item` nếu không cần.

- [ ] **Step 3: SVG icon**

Dùng path SVG đơn giản (16×16), stroke/fill `currentColor`, `aria-hidden="true"` trên svg. Không CDN. Có thể copy path gần GitHub Octicons tương đương: people/copilot, plus, circle-dot (issues), git-pull-request, inbox.

- [ ] **Step 4: Kiểm tra DOM**

```powershell
Select-String -Path "src\index.html" -Pattern "site-header__search-bar"
# Expected: đúng 1 match
Select-String -Path "src\index.html" -Pattern "site-header__nav"
# Expected: có site-header__nav (+ nav-item nếu dùng)
Select-String -Path "src\index.html" -Pattern "Search GitHub"
# Expected: không còn text label; chỉ còn aria-label nếu có
```

---

### Task 2: CSS — full-bleed + layout + nav icons

**Files:**
- Modify: `src/css/style.css` (`.site-header*`, media mobile)

- [ ] **Step 1: Full-bleed site-header**

Đổi `.site-header`:

```css
.site-header {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  min-width: 0;
  /* BỎ: max-width: 1200px; margin: 0 auto; */
  padding: 12px 16px; /* sát mép; gốc GitHub ~16px */
}
```

Tương tự `.sub-nav > div, .sub-nav details`: bỏ `max-width: 1200px; margin: 0 auto` nếu muốn tab full-bleed sát trái như image-3. (Main content vẫn có thể giữ max-width 1200 — chỉ header/sub-nav full-bleed.)

- [ ] **Step 2: Search compact bên phải (không chiếm hết giữa)**

```css
.site-header__search-bar {
  flex: 0 1 272px;   /* compact, không flex:1 1 auto full */
  max-width: 320px;
  margin-left: auto; /* đẩy search + nav + avatar sang phải */
  /* giữ dark input styles hiện có */
}
```

Bỏ/gỡ rule `.site-header label { flex: 1 1 320px; … }` vì label đã xóa.

- [ ] **Step 3: Style `.site-header__nav`**

```css
.site-header__nav {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 0 0 auto;
}

.site-header__nav-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  min-height: 32px;
  padding: 0 6px;
  color: var(--header-text);
  background: transparent;
  border: 1px solid #484f58;
  border-radius: 6px;
  box-shadow: none;
}

.site-header__nav-item:hover {
  background: #21262d;
}
```

Avatar giữ `flex: 0 0 32px` ngay sau nav.

- [ ] **Step 4: Desktop max-width search override**

Trong `@media (min-width: 768px)`: nếu còn `.site-header__search-bar { max-width: 420px; }` thì giảm còn ~272–320px cho khớp gốc.

- [ ] **Step 5: Mobile**

Trong `@max-width: 767px`:
- Có thể ẩn `.site-header__nav` hoặc xếp wrap; avatar + hamburger vẫn hiện.
- Search full width order 2 nếu cần (giữ pattern wrap hiện tại, bỏ rule label).

- [ ] **Step 6: Verify visual**

Mở `src/index.html` ở 1200px / 768px / 375px:

1. Header chạm mép trái + phải (không khoảng trống lớn 2 bên).
2. Chỉ 1 search box, nằm cụm bên phải trước icons.
3. 5 icon + avatar liền nhau như image-1.
4. Sub-nav tab sát trái (nếu đã bỏ max-width).
5. Không overflow ngang.

```powershell
git diff --check
git add src/index.html src/css/style.css
git commit -m "fix: site-header full-bleed search and nav icons"
```

---

### Task 3 (optional docs): class inventory

Nếu repo còn enforce inventory class (spec/plan cũ):

- Thêm `site-header__nav` (và `site-header__nav-item` nếu dùng) vào:
  - `docs/superpowers/specs/2026-08-09-github-libraries-html-css-design.md`
  - `docs/superpowers/plans/2026-08-09-github-libraries-html-css.md`
  - `docs/superpowers/specs/2026-08-09-github-libraries-layout-v2-design.md` (nếu còn hợp đồng class)
- Draw.io v2: thêm nhãn `.site-header__nav` cạnh avatar nếu muốn đồng bộ bản vẽ (không bắt buộc để code chạy).

---

## Acceptance checklist

- [ ] Đúng 1 phần tử `.site-header__search-bar` trong DOM.
- [ ] Không còn text label "Search GitHub" cạnh input.
- [ ] Có `.site-header__nav` chứa 5 icon SVG (thứ tự image-1) ngay trước `.site-header__avatar`.
- [ ] `.site-header` full-bleed (không max-width 1200 + margin auto).
- [ ] Search + nav + avatar dồn về phía phải; hamburger/logo/heading sát trái.
- [ ] Dark theme, focus-visible, không asset ngoài, không JS.
- [ ] `git diff --check` sạch.

## Ngoài phạm vi

- Không đổi footer / right-info / dark tokens (đã xong trước đó).
- Không implement dropdown/menu thật cho copilot/create (static button only).
- Không bắt buộc đổi text sub-nav sang Overview/Repositories/Projects (trừ khi user yêu cầu riêng).
