# Mobile: sub-nav 2+1, Repositories block, footer order — Plan (handoff)

> **For agentic workers:** Plan only until assigned. REQUIRED SUB-SKILL when executing: superpowers:executing-plans or subagent-driven-development.

**Goal:** Sửa 3 vùng mobile còn lệch so với GitHub gốc theo cặp ảnh user chụp.

**Architecture:** Chỉ `src/index.html` + `src/css/style.css`. Không JS. Giữ class BEM đã chốt; chỉ CSS + markup tối thiểu.

**Tech Stack:** HTML + CSS. Mobile: `@media (max-width: 767px)`, target 375px.

---

## 1. Sub-nav: 2 block trái | 1 block phải (image-1 gốc · image-2 clone)

### Gốc (image-1)
```
[ Overview ] [ Repositories 6 ]  |  [ More ▾ ]
     ^underline cam
```
- **Trái:** 2 tab (Overview, Repositories + badge số).
- **Phải:** 1 control “More ▾”.
- **Ngăn cách:** vạch dọc `|` giữa nhóm trái và More.
- **Không** hiện Languages / People / About trên hàng chính.

### Clone hiện tại (image-2)
```
Overview  Repositories  Languages  People  Ab…
```
- 1 hàng dàn ngang (scroll-x) mọi tab — sai pattern “2 trái | 1 phải”.

### Cải thiện

| # | Việc | File |
|---|------|------|
| 1 | Mobile: chỉ **hiện** 2 tab đầu (Overview = `.sub-nav_nav1`, Repositories = `.sub-nav__nav2`) + 1 control More | HTML + CSS |
| 2 | Ẩn `.sub-nav__nav3`–`__nav5` trên mobile **hoặc** gộp vào More | CSS `display:none` hoặc markup |
| 3 | More: dùng `details/summary` **static** (không JS) — `summary` text “More ▾”; bên trong 3 link Languages/People/About | HTML |
| 4 | Layout flex: nhóm trái `flex:1` + gap; More `margin-left: auto` | CSS |
| 5 | Divider dọc giữa trái và More: `border-left` trên More hoặc pseudo-element | CSS |
| 6 | Badge “6” trên Repositories (optional, tĩnh) — span trong tab, style pill nhỏ | HTML + CSS |
| 7 | Active underline chỉ dưới Overview (giữ `.sub-nav_nav1` border-bottom cam) | CSS (đã có) |

**Không:** dàn ngang 5 tab scroll-x như hiện tại.

**Markup gợi ý (mobile-first structure, desktop vẫn hiện đủ 5 nếu cần):**

```html
<nav class="sub-nav">
  <div class="sub-nav__primary">  <!-- hoặc style .sub-nav > div -->
    <a class="sub-nav_nav1" href="#popular">Overview</a>
    <a class="sub-nav__nav2" href="#repositories">Repositories <span>6</span></a>
    <!-- desktop-only: Languages People About -->
    <details class="sub-nav__more">  <!-- mobile More; reuse sub-nav__hamburger? hoặc summary class có sẵn -->
      <summary>More ▾</summary>
      <a class="sub-nav__nav3" …>Languages</a>
      …
    </details>
  </div>
</nav>
```

**Class note:** Ưu tiên **không** thêm BEM block mới. Có thể:
- Style `details` trong `.sub-nav` bằng element selector + `summary` (đã có `.sub-nav__hamburger` trên summary desktop-mobile trước đó — **reuse** `.sub-nav__hamburger` cho summary “More ▾” nếu hợp lý), **hoặc**
- Chỉ CSS ẩn nav3–5 + `::after` “More” (yếu hơn, không mở được).

**Recommended:** `details > summary.sub-nav__hamburger` text đổi “More ▾” trên mobile; ẩn summary trên desktop; ẩn details body trên desktop; mobile ẩn nav3–5 ngoài details.

---

## 2. Repositories block (image-4 gốc · image-3 clone)

### Gốc (image-4)
```
[icon] Repositories          ← title + icon repo, không subtitle “Browse 12,348…”
[ 🔍 Find a repository... ]  ← input full width, 1 hàng, border nhẹ, KHÔNG box to bao ngoài
[ Type ▾ ] [ Language ▾ ] [ Sort ▾ ]  ← 3 nút nhỏ, cùng hàng, sát nhau, dưới search
```

### Clone (image-3)
```
Repositories
Browse 12,348 public repositories across popular languages   ← subtitle thừa
┌─────────────────────────────────────┐
│ Find a repository...     [ Type ▾ ] │  ← search + Type cùng hàng trong box
│ [ Language ▾ ] [ Sort ▾ ]           │  ← wrap 2 nút
└─────────────────────────────────────┘
```
- Box `.search-bar` (nền + border + padding) bao cả search + filters.
- Subtitle `.sub-heading__languages` hiện.
- Title không có icon repo.

### Cải thiện

| # | Việc | File |
|---|------|------|
| 1 | Mobile: **ẩn** `.sub-heading__languages` (subtitle Browse…) | CSS |
| 2 | Title: thêm icon repo inline cạnh “Repositories” (SVG trong `.sub-heading__title` hoặc trước h2) — giữ class title | HTML |
| 3 | Bỏ “boxed” look trên mobile: `.search-bar` → `background: transparent; border: none; padding: 0; gap: 8px` | CSS mobile |
| 4 | Layout search: **column** — hàng 1 = input full width; hàng 2 = 3 filter ngang (`flex-wrap` / `row`) | CSS |
| 5 | Input: 1 dòng full width, placeholder “Find a repository…”, icon search **trong** input (đã có `.search-bar__icon` — mobile hiện lại icon, absolute trong input) | CSS |
| 6 | Nút Type / Language / Sort: size nhỏ, `width: auto`, không stretch full; gap 8px | CSS (đã gần; chỉnh lại column stack) |
| 7 | Label “Search repositories”: giữ visually-hidden (đã có) | — |

**Cụ thể CSS mobile gợi ý:**

```css
/* @media max-width 767px */
.sub-heading__languages { display: none; }

.search-bar {
  flex-direction: column;
  align-items: stretch;
  background: transparent;
  border: none;
  padding: 0;
  gap: 8px;
}

.search-bar__input {
  flex: none;
  width: 100%;
}

.search-bar__nav1,
.search-bar__nav2,
.search-bar__nav3,
.fitter-btn {
  flex: 0 0 auto;
  width: auto;
}

/* Hàng filter: wrap 3 nút trên 1 row */
.search-bar {
  /* input full; buttons group — có thể dùng order hoặc chỉ wrap tự nhiên */
}
```

Nếu 3 nút + input trong 1 flex column: input `width:100%`, rồi 3 nút `display:flex; flex-direction:row` — **cần group** nút. Không thêm class: dùng `flex-wrap` + input `flex: 1 0 100%` (chiếm cả hàng), nút `flex: 0 0 auto` (xuống hàng 2).

```css
.search-bar__input { flex: 1 0 100%; }
.search-bar__nav1, .search-bar__nav2, .search-bar__nav3, .fitter-btn { flex: 0 0 auto; }
```

---

## 3. Footer (image-5 gốc · image-6 clone)

### Gốc (image-5) — thứ tự dọc
1. **People** (heading + paragraph muted)
2. divider
3. **Top languages** (1 hàng dots + names)
4. **Report abuse** (muted, nhỏ)
5. **Footer links** — text **muted xám**, size nhỏ, wrap nhiều dòng căn giữa:  
   `Terms Privacy Security Status Community Docs` / `Contact Manage cookies` / `Do not share…`
6. **Logo + ©** — dưới cùng, căn giữa, logo nhỏ + “© 2026 GitHub, Inc.”

### Clone (image-6) — sai
1. Logo + © **trên**
2. Links **màu xanh link** to, hàng to, gap lớn  
   → ngược thứ tự, sai màu, sai density.

### Cải thiện

| # | Việc | File |
|---|------|------|
| 1 | **DOM order** footer: `links` trước, rồi `logo` + `copyright` (hoặc CSS `order`) để khớp gốc image-5 | HTML reorder **hoặc** `order` mobile |
| 2 | `.site-footer__links a`: `color: var(--muted)` trên mobile (không `var(--link)` xanh nổi) | CSS |
| 3 | Links: `font-size: 12px`, `min-height` giảm nếu parity > 44px a11y — **chọn:** parity (min-height ~ auto / 32px) **hoặc** giữ 44px a11y; ghi rõ trong commit | CSS |
| 4 | `justify-content: center; text-align: center; gap: 4px 10px` | CSS |
| 5 | Logo + ©: `flex` row hoặc column compact, `order` sau links, gap 4–8px | CSS |
| 6 | right-info (People / languages / Report abuse) **ở trên** footer trong flow — đã đúng nếu aside trước footer; kiểm tra không có logo chen giữa right-info và links | DOM |

**DOM gợi ý (khớp image-5):**

```html
<footer class="site-footer">
  <nav class="site-footer__links">…</nav>
  <a class="site-footer__logo">…</a>
  <p class="site-footer__copyright">© 2026 GitHub, Inc.</p>
</footer>
```

Desktop hiện tại: logo | © | links ngang. Reorder DOM có thể cần CSS desktop `order` / flex direction để desktop vẫn logo–©–links như trước **hoặc** chấp nhận footer desktop cũng links-then-logo (gốc desktop footer khác — kiểm tra 1200px).

**Recommended:** Reorder DOM → links, logo, copyright; desktop:

```css
.site-footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 16px;
}
/* hoặc desktop: logo order 1, copyright 2, links 3 với margin-left auto nếu cần */
```

---

## 4. Thứ tự thực thi (handoff)

| Task | Scope | Done when |
|------|--------|-----------|
| **T1** | Sub-nav 2 trái \| More phải + divider + ẩn tab thừa | 375px khớp image-1 pattern |
| **T2** | Repositories: ẩn subtitle, unbox search-bar, input full rồi 3 filter dưới | khớp image-4 |
| **T3** | Footer: order links → logo+©; muted links; compact | khớp image-5 |
| **T4** | QA 375 / 767 / 1200 — không regress desktop header | no overflow ngang |

**Commits gợi ý:**
- `fix: mobile sub-nav primary tabs and More`
- `fix: mobile repositories search unboxed layout`
- `fix: mobile footer order and muted links`

---

## 5. Acceptance checklist

- [ ] Sub-nav mobile: Overview + Repositories (trái), More ▾ (phải), có divider; **không** dàn Languages/People/About trên hàng chính.
- [ ] Repositories: không subtitle Browse…; search full width 1 hàng; Type/Language/Sort hàng dưới, không box to bao ngoài.
- [ ] Footer: People/languages/Report abuse (right-info) phía trên; rồi links muted wrap; rồi logo + © dưới.
- [ ] Links footer không xanh nổi (muted).
- [ ] Desktop 1200 không vỡ (sub-nav 5 tab hoặc More ẩn đúng).
- [ ] Không JS; class contract giữ; `git diff --check` sạch.

---

## 6. Ngoài phạm vi

- Không đổi dark theme tokens.
- Không implement dropdown More bằng JS (chỉ `details/summary`).
- Không bắt buộc badge “6” nếu không muốn thêm span — optional.
- Không pixel-perfect sparkline repo list.

---

## 7. File chạm

| File | Thay đổi |
|------|----------|
| `src/index.html` | sub-nav structure (More details); optional title icon; footer child order; optional badge 6 |
| `src/css/style.css` | `@media (max-width: 767px)` sub-nav, search-bar, sub-heading, site-footer; có thể base footer order |

---

## 8. Ghi chú nhanh cho người thực thi

1. **Sub-nav** là lỗi cấu trúc (2+1 vs dàn ngang) — sửa trước, screenshot so image-1.
2. **Repositories** chủ yếu CSS unbox + flex basis 100% cho input — tránh đụng desktop `.search-bar` boxed.
3. **Footer** dễ lệch desktop nếu reorder DOM — test 1200 ngay sau T3.
4. Ảnh gốc mobile: image-1 (sub-nav), image-4 (repos), image-5 (people+footer). Clone: image-2, image-3, image-6.
