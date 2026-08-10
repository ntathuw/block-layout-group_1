# Layout gaps: mobile sub-nav/repos/footer + desktop right-info beside Popular — Plan (handoff)

> **For agentic workers:** Plan only until assigned. REQUIRED SUB-SKILL when executing: superpowers:executing-plans or subagent-driven-development.

**Goal:** Sửa (A) 3 vùng mobile còn lệch + (B) **desktop**: `.right-info` phải đứng **cạnh Popular repositories**, không cạnh Repositories/repo-list.

**Architecture:** Chỉ `src/index.html` + `src/css/style.css`. Không JS. Giữ class BEM đã chốt; chỉ CSS + markup tối thiểu.

**Tech Stack:** HTML + CSS. Mobile: `@media (max-width: 767px)`, target 375px. Desktop: `>= 768px`, 1200px.

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

## 3b. Desktop: `.right-info` cạnh Popular (không cạnh Repositories)

### Gốc (user image-1 desktop)
```
┌────────────────────────────┬─────────────────┐
│ Popular repositories       │ People          │
│ [card] [card]              │ Top languages   │
│ [card] [card]              │ Report abuse    │
│ [card] [card]              │                 │
└────────────────────────────┴─────────────────┘
  (Repositories / search / repo-list nằm DƯỚI hàng này, full width)
```
- Cột phải (People / Top languages / Report abuse) **align top với “Popular repositories”**.
- Grid popular 2 cột card; sidebar sticky/tĩnh bên phải **cùng hàng** với popular.

### Clone (user image-2 desktop)
```
Repositories + search bar (full width)
┌────────────────────────────┬─────────────────┐
│ repo-list (facebook/react…)│ People / langs  │
│ pagination                 │                 │
└────────────────────────────┴─────────────────┘
```
- `.right-info` nằm **trong** `.main-layout` cạnh `.repo-list` → visual “kế Repositories”.

### Nguyên nhân DOM hiện tại (`src/index.html`)

Thứ tự trong `.center`:

1. `.Page-title` + profile  
2. `.popular-repos` ← full width, **không** có sibling right-info  
3. `.sub-heading` + `.search-bar`  
4. `.main-layout`  
   - cột trái: `.repo-list` + `.pagination`  
   - cột phải: **`.right-info`** ← sai vị trí so với gốc  

### Cải thiện (recommended)

**T0 — Desktop layout restructure (ưu tiên cao khi giao 1 lần)**

| # | Việc | File |
|---|------|------|
| 1 | Tách `.right-info` **ra khỏi** `.main-layout` (không còn sibling của `.repo-list`) | HTML |
| 2 | Bọc **cùng hàng desktop**: `.popular-repos` + `.right-info` trong 1 wrapper flex | HTML |
| 3 | Wrapper class: **ưu tiên không class mới** — dùng element/structure có sẵn nếu được; nếu cần 1 wrapper, dùng class đã có trong contract nếu khớp, **hoặc** chấp nhận wrapper vô danh + style `.center > .popular-with-aside` chỉ khi group đồng ý class mới. **Recommended lazy:** reuse `.main-layout` **một lần** cho hàng Popular+right-info, và **không** dùng `.main-layout` cho repo-list (repo-list full width dưới). | HTML + CSS |
| 4 | CSS desktop (`>=768`): hàng Popular+aside = `display:flex; align-items:flex-start; gap:24px`; popular `flex:1 1 auto` (grid 2 cột card giữ nguyên); right-info `flex:0 0 ~280px` / `1 1 28%` | CSS |
| 5 | CSS: `.repo-list` + pagination + sub-heading + search-bar = **full width** dưới hàng popular (không chia cột với right-info) | CSS |
| 6 | Mobile: vẫn 1 cột — popular trước; right-info sau pagination (hoặc sau popular — bám thứ tự đọc gốc mobile). Không để right-info chen giữa search và list nếu không khớp mobile plan | CSS + DOM order |
| 7 | Optional: `position: sticky; top: …` cho `.right-info` desktop (gốc GitHub sticky) — nice-to-have | CSS |

**DOM gợi ý (sau refactor):**

```html
<div class="center">
  profile…
  <!-- Hàng 1 desktop: popular | right-info -->
  <div class="main-layout">  <!-- reuse: flex row desktop, column mobile -->
    <section class="popular-repos">…cards…</section>
    <aside class="right-info">…People / languages…</aside>
  </div>

  <div class="sub-heading">Repositories…</div>
  <form class="search-bar">…</form>
  <section class="repo-list">…</section>
  <nav class="pagination">…</nav>
</div>
```

**Lưu ý:**
- Hiện `.main-layout > div` bọc repo-list+pagination — sau refactor có thể **bỏ** wrapper div thừa nếu không cần.
- Class contract: `main-layout`, `popular-repos`, `right-info`, `repo-list`, `pagination` đều phải còn trong DOM.
- Draw.io v2: desktop group `.right-info` cạnh popular (x=1323) — **đồng bộ** với refactor này; nếu drawio còn vẽ right-info cạnh repo-list thì cập nhật nhãn/vị trí (optional, cùng PR design).

**Không làm:** absolute positioning right-info “nhảy” lên popular (dễ vỡ responsive). Ưu tiên **đổi DOM + flex**.

---

## 4. Thứ tự thực thi (handoff — 1 lần giao)

| Task | Scope | Done when |
|------|--------|-----------|
| **T0** | Desktop: right-info cạnh Popular; repo-list full width dưới | 1200px khớp image-1 desktop (user) |
| **T1** | Sub-nav 2 trái \| More phải + divider + ẩn tab thừa | 375px khớp sub-nav 2+1 |
| **T2** | Repositories: ẩn subtitle, unbox search-bar, input full rồi 3 filter dưới | khớp repos gốc mobile |
| **T3** | Footer: order links → logo+©; muted links; compact | khớp footer gốc mobile |
| **T4** | QA 375 / 767 / 1200 | no overflow; desktop T0 không regress mobile |

**Commits gợi ý:**
- `fix: place right-info beside popular repos on desktop`
- `fix: mobile sub-nav primary tabs and More`
- `fix: mobile repositories search unboxed layout`
- `fix: mobile footer order and muted links`

---

## 5. Acceptance checklist

- [ ] **Desktop 1200:** `.right-info` (People / Top languages / Report abuse) **cạnh** `.popular-repos`, align top; **không** cạnh `.repo-list` / dưới search Repositories.
- [ ] **Desktop:** `.repo-list` + pagination full width **dưới** hàng popular+aside.
- [ ] Sub-nav mobile: Overview + Repositories (trái), More ▾ (phải), có divider; **không** dàn Languages/People/About trên hàng chính.
- [ ] Repositories mobile: không subtitle Browse…; search full width 1 hàng; Type/Language/Sort hàng dưới, không box to bao ngoài.
- [ ] Footer mobile: links muted wrap rồi logo + © dưới; right-info phía trên footer.
- [ ] Mobile 1 cột: thứ tự đọc hợp lý (popular → … → list → pagination → right-info hoặc theo plan mobile).
- [ ] Không JS; class contract giữ (`main-layout`, `right-info`, `popular-repos`, …); `git diff --check` sạch.

---

## 6. Ngoài phạm vi

- Không đổi dark theme tokens.
- Không implement dropdown More bằng JS (chỉ `details/summary`).
- Không bắt buộc badge “6” nếu không muốn thêm span — optional.
- Không pixel-perfect sparkline repo list.
- Không absolute-hack right-info.

---

## 7. File chạm

| File | Thay đổi |
|------|----------|
| `src/index.html` | **T0:** move `.right-info` cạnh `.popular-repos` (reuse `.main-layout`); sub-nav More; footer child order; optional badge 6 / title icon |
| `src/css/style.css` | **T0:** desktop flex popular\|aside; repo-list full width; mobile column; + mobile sub-nav / search-bar / footer |

---

## 8. Ghi chú nhanh cho người thực thi

1. **T0 desktop right-info** là lỗi **cấu trúc DOM** (aside trong `.main-layout` với repo-list) — sửa trước hoặc cùng batch; screenshot 1200 so user image-1.
2. **Sub-nav** mobile 2+1 vs dàn ngang — screenshot 375.
3. **Repositories** mobile: CSS unbox + `flex: 1 0 100%` input — đừng phá desktop boxed search.
4. **Footer** reorder DOM → test desktop 1200 ngay.
5. Ảnh: desktop right-info gốc = user image-1 (popular+people); clone sai = image-2 (repos+people). Mobile: sub-nav / repos / footer theo plan §1–3.
