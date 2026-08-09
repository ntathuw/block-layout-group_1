# Mobile parity gaps — Implementation Plan (handoff)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans. This plan is **analysis + work items only** — implement after human assigns execution.

**Goal:** Đưa layout mobile (`@media max-width: 767px`, target 375px) gần GitHub Libraries gốc theo cặp ảnh gốc/clone đã chụp.

**Architecture:** Chỉ `src/index.html` + `src/css/style.css`. Không JS, không CDN. Ưu tiên CSS + chỉnh markup tối thiểu; giữ class BEM đã chốt (`site-header*`, `sub-nav*`, `Profile-*`, `popularrepo-card*`, `search-bar*`, `repo-card*`, `right-info*`, `site-footer*`, `pagination`).

**Tech Stack:** HTML + CSS thuần. Breakpoint mobile: `< 768px`.

**Nguồn ảnh (user):**

| # | Gốc | Clone | Vùng |
|---|-----|-------|------|
| A | image-1 | image-2 | Header + sub-nav + top of page |
| B | image-4 | image-3 | Profile / org block |
| C | image-5 | image-6 | Popular repositories |
| D | image-7 | image-8 | Repositories list + filters |
| E | image-9 | image-10 | right-info + footer (+ pagination) |

---

## 1. Tóm tắt lỗi theo mức độ

| Priority | Vùng | Clone đang | Gốc cần |
|----------|------|------------|---------|
| **P0** | Header mobile | Search full-width hàng 2; icon repo + nav ẩn; sub-nav = `details` “Explore libraries” | 1 hàng: hamburger · logo · name · search-icon · inbox · avatar; sub-nav = tab ngang (Overview / Repositories / More) |
| **P0** | Profile | `h1` lớn + Follow full-width xanh | Không page-title to; avatar + tên + Follow ghost cùng hàng; meta followers/link/email |
| **P1** | Popular repos | 2 card, meta “Updated…”, thiếu Public | Nhiều card dọc, badge Public, stars + forks, không “Updated” |
| **P1** | All repos / filters | Label “Search repositories”; filter 3 nút full-width xếp dọc | Search gọn; Type/Language/Sort dropdown nhỏ cùng hàng |
| **P1** | Repo card | Meta đơn giản, không sparkline | Public cạnh title; lang · stars · license · forks · issues · Updated date; sparkline (optional) |
| **P2** | right-info | Icon tròn lớn; languages dọc; copy “Open source community” | Text People gốc; languages **ngang** 1 hàng; Report abuse muted |
| **P2** | Footer | Logo / copyright / links xếp dọc, gap lớn, link to | Footer compact, links wrap giữa, logo+© gần nhau |
| **P2** | Pagination | Hiện trước right-info, rút 2/3/4 | Căn giữa, style gọn; thứ tự: list → pagination → right-info → footer |

---

## 2. Chi tiết từng gap (gốc vs clone)

### 2.1 Header + sub-nav (image-1 gốc · image-2 clone) — **P0**

**Gốc:**
- Một hàng header: `[☰] [logo] libraries …… [🔍] [inbox·dot] [avatar]`.
- Search trên mobile là **icon**, không phải input full width.
- Sub-nav ngay dưới: tab ngang `Overview` (gạch cam) · `Repositories` + badge `6` · `More ▾` (không accordion).

**Clone hiện tại:**
- Hàng 1: ☰ · logo · Libraries · `site-header__icon` · avatar.
- Hàng 2: `.site-header__search-bar` full width (`order: 2`).
- Hàng 3: `details` / `.sub-nav__hamburger` “Explore libraries”.
- `.site-header__nav` bị `display: none` trên mobile.

**Cải thiện (plan):**

1. **Mobile header 1 hàng compact**
   - Ẩn `.site-header__icon` trên mobile (gốc không có icon repo giữa logo–name trên bar).
   - Search: ẩn input full-width; hiện **icon-only control** (có thể reuse class `site-header__search-bar` + modifier visual, hoặc wrap icon trong control dùng class hiện có — **không thêm BEM block mới** trừ khi spec cho phép; ưu tiên `aria-label` + ẩn text field bằng CSS/`appearance` nếu giữ 1 input).
   - Hiện **1–2 icon** phải (search + notifications) thay vì ẩn hết `.site-header__nav`; ẩn Create/Copilot/PR nếu chật (chỉ giữ search + inbox + avatar như gốc).
   - Bỏ `flex-wrap` + `order: 2` full-width search nếu phá 1-hàng.

2. **Sub-nav mobile**
   - Ẩn `details` / “Explore libraries” trên viewport giống gốc (hoặc chỉ dùng khi `< 320px`).
   - Hiện hàng tab ngang (scroll-x nếu cần): map `Popular→Overview`, `Repositories`, gộp Languages/People/About vào “More” **static** (không JS dropdown — có thể là link hoặc summary gọn).
   - Active tab: gạch cam dưới (giữ pattern `.sub-nav_nav1`).

**Files:** `src/index.html` (sub-nav labels/structure nếu cần), `src/css/style.css` (`@media max-width: 767px` · `.site-header*` · `.sub-nav*`).

---

### 2.2 Profile / org block (image-4 gốc · image-3 clone) — **P0**

**Gốc:**
- Không có `h1` “Libraries” to phía trên.
- Hàng: avatar vuông bo góc · **Libraries** (tên org) · **Follow** (nút outline, phải).
- Dưới tên: `9 followers` · link · email (icon + text muted).

**Clone:**
- `.Page-title` “Libraries” lớn.
- Avatar GitHub + “GitHub” + mô tả dài.
- `.Profile-action__follow-btn` full width, nền xanh đậm.

**Cải thiện:**

1. Mobile: ẩn hoặc thu nhỏ `.Page-title` (gốc không dùng page title to) — **hoặc** giữ class nhưng `display: none` / font nhỏ hơn nếu drawio bắt buộc class.
2. Profile: flex row `avatar | info | Follow`; Follow **không** `width: 100%` — `flex: 0 0 auto`, style ghost (border, bg surface-muted/dark).
3. Meta: thay / bổ sung nội dung tĩnh gần gốc (followers, URL, email) trong `.Profile-info__meta` (có thể nhiều dòng / spans). Copy org name “Libraries” nếu muốn khớp screenshot org thật (hiện “GitHub” là data demo — ghi rõ: **content** vs layout).

**Files:** `src/index.html` (profile content), `src/css/style.css` (`.Page-title`, `.Page-title + section`, `.Profile-*` trong mobile media).

---

### 2.3 Popular repositories (image-5 gốc · image-6 clone) — **P1**

**Gốc:** danh sách dài, mỗi card: title + `Public` badge; desc; lang-dot · ★ · forks.  
**Clone:** 2 card; badge ngôn ngữ pill; “Updated recently”; không `Public`.

**Cải thiện:**

1. HTML: thêm card tĩnh (mục tiêu ≥ 4–6) nếu muốn parity nội dung; mỗi `.popularrepo-card` có badge Public (reuse `.popularrepo-card__badge` hoặc pattern repo-card).
2. Meta: stars + forks; bỏ/giảm “Updated …” trên popular nếu gốc không có.
3. CSS mobile: card full width, padding gọn, header title + Public `space-between`.

**Files:** `src/index.html` (`.popular-repos`), `src/css/style.css` (`.popularrepo-card*`).

---

### 2.4 All repositories + search/filters (image-7 gốc · image-8 clone) — **P1**

**Gốc:**
- Tiêu đề “Repositories” + icon repo nhỏ.
- Input “Find a repository…” (1 dòng).
- Hàng filter: `Type ▾` `Language ▾` `Sort ▾` (nút nhỏ, cùng hàng, wrap nếu chật).
- List liền, có sparkline xanh (optional visual).

**Clone:**
- “All repositories” + subtitle “Browse 12,348…”.
- Label “Search repositories” chiếm chỗ.
- 3 filter full-width xếp dọc (Type: All / Language: All / Sort: Stars).

**Cải thiện:**

1. Mobile CSS: ẩn label text “Search repositories” (giữ accessible name qua `aria-label` / `sr-only` pattern nếu có — hoặc `label` visually hidden).
2. `.search-bar`: column nhưng filter **hàng ngang wrap** (`flex-direction: row; flex-wrap: wrap` cho nhóm nút), nút không `width: 100%`.
3. Copy nút: `Type` / `Language` / `Sort` (+ chevron text `▾` nếu muốn) thay vì `Type: All`.
4. Optional: sparkline SVG inline tĩnh trên `.repo-card` (decorative `aria-hidden`) — **YAGNI** nếu thời gian gấp; ghi “nice-to-have”.
5. Meta repo-card: thêm Public cạnh title (đã có một phần); license / forks / issues text tĩnh nếu muốn gần gốc.

**Files:** `src/index.html` (`.sub-heading`, `.search-bar`, `.repo-card`), `src/css/style.css` (`.search-bar*`, `.repo-card*` mobile).

---

### 2.5 right-info (image-9 gốc · image-10 clone) — **P2**

**Gốc:**  
People (heading + paragraph “no public members…”) · divider · Top languages **horizontal** (4 dots + names) · Report abuse muted · footer links compact.

**Clone:**  
Icon people lớn · copy “Open source community” + “Over 100 million…” · languages **vertical** · Report abuse link xanh · pagination phía trên block.

**Cải thiện:**

1. Content: copy People gần gốc; languages 1 hàng (`display: flex; flex-wrap: wrap; gap`) cho `.right-info ul` / `__meta`.
2. Ẩn hoặc thu nhỏ `.right-info_people` icon trên mobile nếu gốc không có.
3. Report abuse: `color: var(--muted)` (không nổi link xanh).
4. DOM order: pagination **sau** repo-list, **trước** right-info (đã gần đúng); đảm bảo không nhảy visual (clone image-10 có pagination trên People — kiểm tra thứ tự DOM).

**Files:** `src/index.html` (`.right-info`), `src/css/style.css` (`.right-info*` mobile).

---

### 2.6 Footer (image-9 gốc · image-10 clone) — **P2**

**Gốc:** links wrap giữa/căn compact; logo + © gần nhau; gap nhỏ.  
**Clone:** cột dọc full width; logo riêng; links to, min-height 44px lớn; khoảng trống nhiều.

**Cải thiện:**

1. Mobile footer: `flex-direction: column; align-items: center; text-align: center; gap: 8–12px`.
2. `.site-footer__links`: `justify-content: center; gap: 8px 12px`; giảm min-height link (vẫn ≥ 44px touch nếu a11y bắt buộc — tradeoff: gốc gọn hơn 44px; ghi rõ chọn **a11y 44px** hoặc **visual parity**).
3. Thứ tự visual: links → logo + © (khớp image-9) **hoặc** logo+© → links; bám ảnh gốc image-9 (links trước, logo+© dưới).

**Files:** `src/css/style.css` (`.site-footer*`), có thể reorder DOM footer nếu cần.

---

### 2.7 Pagination (image-10 clone) — **P2**

**Clone:** Previous · 1 · 5 · Next (đã ẩn 2,3,4).  
**Cải thiện nhẹ:** căn giữa, gap nhỏ, active pill; đảm bảo không nằm giữa list và right-info sai ý đồ (giữ: list → pagination → right-info → footer).

---

## 3. Thứ tự thực thi đề xuất (handoff)

| Task | Scope | Done when |
|------|--------|-----------|
| **T1** | Mobile header + sub-nav (P0) | 375px: 1 hàng header; search icon-level; tabs ngang; không “Explore libraries” full bar |
| **T2** | Profile block mobile (P0) | Follow không full-width; layout avatar/name/Follow; page-title không chiếm như h1 marketing |
| **T3** | Popular + All repos + filters (P1) | Filters ngang; search gọn; popular/repo cards gần meta gốc |
| **T4** | right-info + footer + pagination (P2) | Languages ngang; footer compact; copy People; spacing |
| **T5** | Visual QA | 375 + 767: no horizontal scroll; spot-check vs image-1…10 |

**Commit messages gợi ý:**
- `fix: mobile header and sub-nav parity`
- `fix: mobile profile and follow layout`
- `fix: mobile repos filters and cards`
- `fix: mobile right-info and footer`

---

## 4. Ràng buộc / ngoài phạm vi

- **Không** đổi desktop (≥768) trừ khi rule mobile làm hỏng desktop — luôn kiểm tra 1200px sau mỗi task.
- **Không** JS dropdown thật cho More / Type / Language / Sort.
- **Không** bắt buộc data thật GitHub API; content tĩnh OK.
- Sparkline, badge số `6` trên Repositories: optional.
- Class contract: không đổi tên `right-info*` / `sub-nav_nav1` typos; chỉ CSS + nội dung.
- Draw.io v2: cập nhật page Mobile nếu layout mobile lệch bản vẽ (optional, sau code).

---

## 5. Acceptance checklist (binary)

- [ ] 375px header ≈ 1 hàng; không search full-width hàng 2; không “Explore libraries” bar to.
- [ ] Sub-nav mobile là tab ngang (hoặc scroll-x), active underline.
- [ ] Profile: Follow không full-width xanh full row; avatar + name + action cùng khối compact.
- [ ] Search repos: không label chiếm chỗ; filter Type/Language/Sort không 3 full-width stack.
- [ ] Popular: ≥ layout card dọc full width; Public + stars/forks pattern.
- [ ] right-info: languages ngang; People copy gần gốc; không icon tròn to (hoặc thu nhỏ).
- [ ] Footer compact, links wrap, không khoảng trống lớn.
- [ ] Không overflow ngang 375 / 767; desktop 1200 không regress.
- [ ] `git diff --check` sạch; không asset ngoài / JS.

---

## 6. Ghi chú cho người thực thi

1. Đọc ảnh gốc trước khi sửa CSS — ưu tiên **cấu trúc + spacing**, không pixel-perfect.
2. Mọi thay đổi mobile chỉ trong `@media (max-width: 767px)` trừ khi selector mobile-first bắt buộc.
3. Sau T1–T2: screenshot 375 so image-1/2/3/4 trước khi sang repos.
4. Nếu conflict drawio vs GitHub thật: **GitHub screenshot (user)** thắng cho visual; class names vẫn theo drawio v2.
