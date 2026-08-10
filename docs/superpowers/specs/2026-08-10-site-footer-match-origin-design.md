# Spec: Footer khớp bản gốc (thứ tự + bỏ Help)

## 1. Mục tiêu

Sửa footer clone tại `src/index.html` + `src/css/style.css` khớp bản gốc image-1:

1. Thứ tự DOM: **logo → copyright → links** (bản gốc), thay vì links → logo → copyright (hiện tại).
2. **Bỏ link Help** (gốc không có).
3. Desktop: 1 hàng, căn giữa cả khối; links không dạt phải.

## 2. Thay đổi chi tiết

### 2.1 HTML (`src/index.html` ~193–212)

- Bỏ `<a id="help" href="#help">Help</a>`.
- Đổi thứ tự 3 child của `.site-footer`:
  - trước: `.site-footer__links` → `.site-footer__logo` → `.site-footer__copyright`
  - sau: `.site-footer__logo` → `.site-footer__copyright` → `.site-footer__links`

Links giữ lại (9 link): Terms, Privacy, Security, Status, Community, Docs, Contact, Manage cookies, Do not share my personal information.

### 2.2 CSS desktop (`src/css/style.css` ~570–608)

- `.site-footer`: giữ flex row, `justify-content: center`, gap gọn. Bỏ bất kỳ đẩy-trái/đẩy-phải.
- `.site-footer__links`: bỏ `justify-content: flex-end` → `center` (hoặc bỏ dòng, mặc định stretch/flex-start theo row center của cha).

### 2.3 CSS mobile (`src/css/style.css` ~856–883)

- Giữ column center.
- DOM đã đúng thứ tự (logo → © → links) → bỏ `order: 1/2/3` thừa trên `.site-footer__links/.site-footer__logo/.site-footer__copyright` nếu không cần.

## 3. Ngoài phạm vi

- Không đổi class `.site-footer*` / không thêm BEM mới.
- Không đổi màu token, header, sticky/pagination.
- Không JS, framework, tài nguyên ngoài, build step.

## 4. Verification

1. Desktop (≥768px): 1 hàng logo → © → links, cả khối căn giữa, không có Help.
2. Mobile (≤767px): stack logo → © → links, căn giữa.
3. `git grep -i '>Help<'` trong `src/` sạch.
4. `git diff --check` sạch.

## 5. Acceptance checklist nhị phân

- [ ] DOM `.site-footer`: logo → copyright → links.
- [ ] Không còn link Help trong HTML.
- [ ] Desktop 1 hàng căn giữa; links không dạt phải.
- [ ] Mobile stack đúng thứ tự logo → © → links.
- [ ] Không class BEM mới; `git diff --check` sạch.
