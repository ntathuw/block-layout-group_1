# Buổi 16 - Block Layout và quy tắc BEM Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tạo tài liệu Markdown tiếng Việt về Block Layout và BEM tại `docs/buoi-16-block-layout-bem.md`.

**Architecture:** Một file tài liệu độc lập, không thêm mã nguồn hay dependency. Nội dung đi từ tư duy layout tổng quát đến cú pháp BEM, quy tắc lồng block và ví dụ Mix.

**Tech Stack:** Markdown thuần, Git.

## Global Constraints

- Dùng tiêu đề `BUỔI 16: BLOCK LAYOUT VÀ QUY TẮC BEM`.
- Dùng class kebab-case và thống nhất với `docs/block-list.md`.
- Modifier dùng hai dấu gạch ngang: `block--modifier` hoặc `block__element--modifier`.
- Không thay đổi `docs/block-list.md`.
- Không thêm dependency hoặc mã nguồn ứng dụng.
- Không để nội dung tạm thời hoặc phần chưa hoàn chỉnh.

---

### Task 1: Viết tài liệu Block Layout và BEM

**Files:**
- Create: `docs/buoi-16-block-layout-bem.md`
- Read: `docs/block-list.md` để đối chiếu quy ước tên block

**Interfaces:**
- Consumes: Nội dung Buổi 16 đã được duyệt và danh sách block hiện có.
- Produces: Một file Markdown đọc độc lập, không có API hoặc mã nguồn phụ thuộc.

- [ ] **Step 1: Tạo cấu trúc heading của tài liệu**

Tạo file với các heading sau, theo đúng thứ tự:

```markdown
# BUỔI 16: BLOCK LAYOUT VÀ QUY TẮC BEM

## Tư duy Layout và Sơ đồ khối (Block Layout)
## Tại sao cần dựng sơ đồ Layout trước khi viết code?
## Quy tắc phân tích và dựng sơ đồ Block Layout
## Phương pháp đặt tên BEM (Block - Element - Modifier)
### Tại sao nên chọn BEM?
### Block (Khối độc lập)
### Element (Phần tử con)
### Modifier (Biến thể / Trạng thái)
## Quy tắc lồng khối trong BEM (Tránh Anti-pattern)
### Giải pháp 1 - Rút gọn tên
### Giải pháp 2 - Tách Block mới (Nested Block)
## Kỹ thuật Mix (Kết hợp Class) nâng cao
```

- [ ] **Step 2: Viết phần Block Layout**

Diễn giải HTML là khung xương/cấu trúc không gian và CSS là phần trang trí/căn chỉnh. Nêu rủi ro của việc viết ngẫu hứng hoặc phụ thuộc AI mà không quy hoạch block: HTML lộn xộn, khó responsive và khó bảo trì.

Trong phần quy tắc phân tích, ghi đủ các điểm sau:

- Phân tích từ ngoài vào trong, bắt đầu bằng container ngoài cùng.
- Phân tích từ trên xuống dưới và từ trái sang phải.
- Các phần tử cùng hàng hoặc có quan hệ hiển thị phải nằm trong block cha phù hợp.
- Danh sách lặp chỉ cần phân tích một phần tử đại diện.
- Block rõ ràng giúp đặt padding và margin đúng, tránh tràn hoặc lệch layout.

- [ ] **Step 3: Viết phần cú pháp BEM**

Giải thích BEM giúp tránh xung đột CSS và làm class dễ đọc, dễ bảo trì. Ghi rõ cú pháp và ví dụ:

```markdown
Block: block-name
Ví dụ: .header, .card, .button, .comment-box

Element: block-name__element-name
Ví dụ: .card__title, .card__image, .card__button

Modifier: block-name--modifier-name
      hoặc block-name__element-name--modifier-name
Ví dụ: .button--active, .button--disabled, .card__title--highlight
```

Nêu rõ Modifier dùng Two Dashes Style và Element dùng hai dấu gạch dưới.

- [ ] **Step 4: Viết quy tắc lồng block và Mix**

Giải thích vì sao không dùng class dạng `.block__element1__element2`, với ví dụ `.card__header__title`. Mô tả hai lựa chọn:

- Rút gọn về Element của Block gốc, ví dụ `.card__title`.
- Tách thành Block mới nếu thành phần đủ độc lập, phức tạp và tái sử dụng được.

Phần Mix phải có đúng ví dụ:

```html
<button class="button card__button">Xem repository</button>
```

Giải thích `.button` giữ giao diện cốt lõi, còn `.card__button` chỉ điều khiển vị trí và khoảng cách trong `card`; không đặt margin hoặc position đặc thù của card trực tiếp vào `.button`.

- [ ] **Step 5: Đọc lại tài liệu để kiểm tra nội dung**

Đối chiếu từng heading với nội dung được duyệt, kiểm tra tất cả ví dụ class dùng kebab-case và bảo đảm không thay đổi `docs/block-list.md`.

### Task 2: Kiểm tra và commit tài liệu

**Files:**
- Verify: `docs/buoi-16-block-layout-bem.md`

**Interfaces:**
- Consumes: File Markdown từ Task 1.
- Produces: Commit chứa duy nhất tài liệu Buổi 16.

- [ ] **Step 1: Kiểm tra file và marker chưa hoàn thành**

Run:

```powershell
Test-Path -LiteralPath "docs/buoi-16-block-layout-bem.md"
rg -n ("TO" + "DO|TB" + "D|FIX" + "ME|place" + "holder") "docs/buoi-16-block-layout-bem.md"
```

Expected: lệnh `Test-Path` trả về `True`; lệnh `rg` không có kết quả.

- [ ] **Step 2: Kiểm tra định dạng diff**

Run:

```powershell
git diff --check
git status --short
```

Expected: `git diff --check` không báo lỗi và chỉ có file `docs/buoi-16-block-layout-bem.md` thay đổi.

- [ ] **Step 3: Commit**

Run:

```powershell
git add -- docs/buoi-16-block-layout-bem.md
git commit -m "docs: add Buoi 16 BEM knowledge"
```

Expected: tạo một commit mới chứa file tài liệu và không chứa thay đổi ngoài phạm vi.
