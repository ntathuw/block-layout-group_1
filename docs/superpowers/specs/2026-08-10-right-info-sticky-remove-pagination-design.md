# Spec: Cột People sticky + bỏ pagination

## 1. Mục tiêu

Xử lý 2 feedback trên bản clone GitHub Libraries tại `src/index.html` + `src/css/style.css`:

1. **Scroll dọc**: block `.right-info` (People) **đứng yên** ở cột phải khi scroll, không trôi theo nội dung.
2. **Bỏ pagination**: design không có pagination → xóa hẳn markup + CSS.

**Không rename** `right-info_people` / `right-info*`: giữ nguyên tên class hiện tại (feedback rename BEM đã hủy).

## 2. Phạm vi

| # | Thay đổi | Chi tiết |
|---|---|---|
| 1 | Không rename BEM | Giữ `right-info`, `right-info_people`, `right-info__heading`, `right-info__description`, `right-info__meta` |
| 2 | Sticky desktop | `.right-info` giữ `position: sticky; top: …` trong `.main-layout` (`align-items: flex-start` đã có) |
| 3 | Mobile | `.right-info { position: static }` — People cuộn theo flow |
| 4 | Xóa pagination | Bỏ `<nav class="pagination">` trong `src/index.html` + toàn bộ rule `.pagination` trong `src/css/style.css` (desktop + media) |

## 3. Ngoài phạm vi

- Không đổi class `.right-info*` / element BEM khác.
- Không đổi nội dung People / Top languages / Report abuse.
- Không JS, framework, tài nguyên ngoài, build step.
- Không refactor layout `.main-layout` / `.repo-list`.

## 4. Thay đổi chi tiết

### 4.1 Sticky desktop

- `.right-info` tại `src/css/style.css` (dòng ~500) giữ `position: sticky; top: 24px`.
- Chuỗi ancestor của `.right-info` là `body` → `main#main-content` → `.center` → `.main-layout`: không rule nào đặt `overflow` (chỉ `.center { overflow-wrap }` trên con). Không cần đổi CSS sticky; chỉ verify ở browser.
- Nếu lúc verify sticky vẫn không bám (cao hơn viewport hoặc ancestor bị overflow): gỡ overflow trên ancestor gây chặn, hoặc đổi sticky lên ancestor không bị cắt.

### 4.2 Mobile

- Media `max-width: 767px`: `.right-info { position: static }` (đã có ở dòng ~863).

### 4.3 Xóa pagination

- `src/index.html`: xóa `<nav class="pagination" aria-label="Repository result pages">…</nav>` (dòng ~167–175).
- `src/css/style.css`: xóa block `.pagination`, `.pagination a`, `.pagination a[aria-current="page"]`, media hide `nth-child(3..5)` (dòng ~570–600, ~662, ~881–885).
- `git grep pagination` trong `src/` phải sạch.

## 5. Verification

1. Desktop (≥768px) scroll dọc: cột People đứng yên trong cột phải; nội dung trái scroll bình thường.
2. Mobile (≤767px): People ở flow gần footer, cuộn theo.
3. Không còn UI pagination ở mọi breakpoint.
4. `git grep -i pagination src/` không ra kết quả.
5. `git diff --check` sạch.

## 6. Acceptance checklist nhị phân

- [ ] `.right-info` sticky trên desktop; ancestor không chặn sticky.
- [ ] `.right-info` static trên mobile.
- [ ] Không còn `<nav class="pagination">` trong HTML.
- [ ] Không còn rule `.pagination` trong CSS.
- [ ] Không đổi class `.right-info*`; không có element BEM mới.
- [ ] `git grep -i pagination src/` sạch; `git diff --check` sạch.
