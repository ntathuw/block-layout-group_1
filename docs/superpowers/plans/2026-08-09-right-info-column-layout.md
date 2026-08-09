# right-info column layout (mobile near footer + desktop full-height right) — Plan (handoff)

> **For agentic workers:** Plan only until assigned. REQUIRED SUB-SKILL when executing: superpowers:executing-plans or subagent-driven-development.

**Goal:** Đưa `.right-info` (People / Top languages / Report abuse) đúng vị trí theo GitHub gốc:

1. **Mobile:** People **gần footer** (sau repo-list + pagination), **không** chen giữa Popular và Repositories.
2. **Desktop:** People = **cột phải full-height** cạnh toàn bộ khối Popular + Repositories; Repositories **gọn** (chỉ cột trái), không full-width dưới People.

**Architecture:** Chỉ `src/index.html` + `src/css/style.css`. Không JS. Giữ class BEM đã chốt. Ưu tiên **đổi DOM + flex** (không absolute-hack).

**Tech Stack:** HTML + CSS. Breakpoint: mobile `< 768px`, desktop `>= 768px`.

---

## 1. Vấn đề (gốc vs clone)

### 1.1 Mobile — thứ tự People (image-1 gốc · image-2 clone)

| | Gốc (image-1) | Clone (image-2) |
|---|---------------|-----------------|
| People | **Cuối trang**, sát footer (links + logo + ©) | **Trên** Repositories / search / repo-list |
| Flow | … list → … → **People** → footer | Popular → **People** → Repositories → list |

**Nguyên nhân DOM hiện tại** (`src/index.html` ~102–142):

```text
.main-layout
  ├── .popular-repos
  └── .right-info          ← sibling của popular
.sub-heading / .search-bar
.repo-list
.pagination
```

Mobile `.main-layout { flex-direction: column }` → stack: Popular → **People** → (ra khỏi main-layout) Repositories… → footer.  
People **không** gần footer.

### 1.2 Desktop — cột People + Repositories gọn (image-3 gốc · image-4 clone)

| | Gốc (image-3) | Clone (image-4) |
|---|---------------|-----------------|
| People | Cột **phải**, cao, cạnh **cả** Popular **và** vùng Repositories | Chỉ một **mảnh nhỏ** cạnh 2 card Popular |
| Repositories | **Gọn** (cột trái, cùng width với Popular) | **Full width** dưới cả hàng Popular+People |
| Search/list | Chỉ nằm cột trái | Search bar kéo full ngang container |

**Nguyên nhân:** `.right-info` chỉ pair với `.popular-repos` trong `.main-layout`; `.sub-heading` / `.search-bar` / `.repo-list` / `.pagination` là sibling **sau** `.main-layout` → full width của `.center`.

---

## 2. Hướng sửa (1 structure cho 2 breakpoint)

### 2.1 DOM mục tiêu

Gộp **toàn bộ cột trái** (Popular + Repositories + pagination) vào **một** vùng primary; `.right-info` là sibling **cùng** `.main-layout`:

```html
<div class="center">
  <!-- profile … -->

  <div class="main-layout">
    <!-- Cột trái: popular → repos → list → pagination -->
    <div class="main-layout__primary">   <!-- xem §2.2 về class -->
      <section class="popular-repos">…</section>
      <div class="sub-heading">…</div>
      <form class="search-bar">…</form>
      <section class="repo-list">…</section>
      <nav class="pagination">…</nav>
    </div>

    <aside class="right-info" id="people">…</aside>
  </div>
</div>
```

### 2.2 Class wrapper cột trái

| Option | Cách | Ưu | Nhược |
|--------|------|-----|--------|
| **A (Recommended)** | Wrapper **không class** + style `.main-layout > div:first-child` (hoặc `.main-layout > div:not(.right-info)`) | Không thêm BEM block | Selector hơi phụ thuộc DOM |
| B | Reuse tên đã có nếu group cho phép (vd chỉ 1 div con flex) | — | Dễ nhầm với rule cũ `.main-layout > div` |
| C | Class mới `main-layout__primary` | Rõ | Phải cập nhật inventory class / spec |

**Recommended: Option A** — 1 wrapper `<div>` (no class) bọc popular + sub-heading + search-bar + repo-list + pagination; CSS:

```css
.main-layout > div {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
```

(Khôi phục / điều chỉnh rule `.main-layout > div` đã từng có.)

### 2.3 CSS desktop (`>= 768` / base)

```css
.main-layout {
  display: flex;
  align-items: flex-start; /* top-align People với Popular */
  gap: 24px;
  min-width: 0;
}

.main-layout > div {
  flex: 1 1 auto;   /* cột trái: popular + repos + list */
  min-width: 0;
}

.right-info {
  flex: 0 0 296px;  /* hoặc 1 1 28% — bám tỷ lệ gốc ~25–30% */
  max-width: 320px;
  min-width: 0;
}

/* Optional: sticky People khi scroll list dài */
.right-info {
  position: sticky;
  top: 24px;
}
```

- Bỏ `margin-bottom` lớn trên `.popular-repos` nếu tạo khoảng trống lạ trong cột trái (giữ gap giữa popular và Repositories).
- `.search-bar` / `.repo-list` **không** `width: 100vw` — chỉ full width **cột trái**.

### 2.4 CSS mobile (`max-width: 767px`)

```css
.main-layout {
  flex-direction: column;
}

.main-layout > div {
  width: 100%;
  order: 1;          /* primary: popular → repos → list → pagination */
}

.right-info {
  width: 100%;
  order: 2;          /* People SAU primary → gần footer */
}
```

Thứ tự đọc mobile:

```text
Popular → Repositories heading → search → repo-list → pagination
→ People / Top languages / Report abuse
→ site-footer
```

Khớp image-1 (People sát footer).

**Không** dùng `order` nếu DOM đã đúng (primary trước, aside sau) — DOM order primary → right-info **đã** đủ cho mobile column. Chỉ cần:

```css
.main-layout { flex-direction: column; }
.main-layout > div,
.right-info { width: 100%; }
```

DOM order = mobile visual order. **Không cần `order`** nếu structure §2.1.

### 2.5 So sánh DOM hiện tại → sau

| Hiện tại | Sau |
|----------|-----|
| `main-layout` = popular + right-info | `main-layout` = **primary div** + right-info |
| repos/list ngoài main-layout (full width) | repos/list **trong** primary (cột trái) |
| Mobile: People giữa popular và repos | Mobile: People **sau** pagination |
| Desktop: People chỉ cạnh popular | Desktop: People cạnh **cả** primary (cột phải) |

---

## 3. Việc cụ thể (checklist)

| # | Việc | File |
|---|------|------|
| 1 | Bọc `.popular-repos` + `.sub-heading` + `.search-bar` + `.repo-list` + `.pagination` trong **một** `<div>` (no class) | `index.html` |
| 2 | Giữ `.right-info` **sibling sau** div đó, cùng parent `.main-layout` | `index.html` |
| 3 | CSS base: `.main-layout > div` flex column, `flex: 1 1 auto; min-width: 0` | `style.css` |
| 4 | CSS base: `.right-info` `flex: 0 0 ~280–320px` (không chỉ “mảnh” cạnh popular) | `style.css` |
| 5 | CSS mobile: `.main-layout { flex-direction: column }` — primary rồi right-info (DOM order) | `style.css` |
| 6 | Gỡ rule mobile làm `right-info` / popular lệch (nếu còn) | `style.css` |
| 7 | Optional sticky `.right-info` desktop | `style.css` |
| 8 | QA 375 / 767 / 1200 | — |

**Commit gợi ý:** `fix: right-info full-height column desktop and near footer mobile`

---

## 4. Acceptance checklist

- [ ] **Mobile 375:** People / Top languages / Report abuse **sau** repo-list + pagination, **trước** footer; **không** nằm trên Repositories.
- [ ] **Desktop 1200:** People cột phải; Popular **và** Repositories (heading + search + list) cùng **cột trái**; search/list **không** full-width dưới People.
- [ ] Tỷ lệ cột phải ~25–30% (≈ 280–320px), không “mảnh” sát cạnh 2 card.
- [ ] Repositories “gọn” = width cột trái (= width popular).
- [ ] Class contract giữ (`main-layout`, `popular-repos`, `right-info`, `repo-list`, `pagination`, …).
- [ ] Không JS; `git diff --check` sạch; không overflow ngang 375/767/1200.

---

## 5. Ngoài phạm vi

- Không đổi copy People / languages (trừ khi user yêu cầu).
- Không đổi sub-nav 2+1 / footer muted (đã plan riêng).
- Không absolute position right-info.
- Không bắt buộc sticky (optional).

---

## 6. File chạm

| File | Thay đổi |
|------|----------|
| `src/index.html` | Wrapper div bọc popular → pagination; `.right-info` sibling cuối trong `.main-layout` |
| `src/css/style.css` | `.main-layout > div`, `.right-info` flex basis; mobile column order theo DOM |

---

## 7. Ghi chú cho người thực thi

1. **Root cause:** right-info chỉ pair với popular → mobile stack sớm; desktop repos full-bleed dưới hàng đó.
2. **Một DOM** phục vụ cả 2 breakpoint: primary (trái/trên) + aside (phải/dưới).
3. Sau sửa: screenshot **375** so image-1; **1200** so image-3 (People cột cao, repos gọn trái).
4. Tránh nhầm “People bên trái” trong mô tả user — ảnh gốc/clone đều People **bên phải**; “chiếm một phần” = **cột phải** full-height, không phải reverse LTR.
