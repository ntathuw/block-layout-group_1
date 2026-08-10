# Spec: Repos search/filter + header icons + sticky right-info

## 1. Mục tiêu

Thu hẹp lệch giữa clone và bản gốc ở 3 vùng, trong phạm vi đã duyệt:

1. `.right-info` (People) **cố định hơn** khi scroll dọc desktop.
2. Section Repositories khớp gốc: **xóa dòng "Browse 12,348…"**, search-bar phẳng, màu filter/search đúng.
3. `.site-header`: search có icon kính lúp, cụm icon phải đúng thứ tự gốc, avatar tròn. **Không đổi sub-nav tabs.**

## 2. Thay đổi chi tiết

### 2.1 Sticky `.right-info` (desktop)

- Giữ `position: sticky; top: 24px`; thêm `align-self: flex-start` (đã có sẵn qua `align-items: flex-start` của `.main-layout`) và `z-index: 1`.
- Đảm bảo không ancestor `overflow` chặn (đã xác nhận: body/`main`/`.center`/`.main-layout` không `overflow`).
- Mobile `≤767px`: giữ `position: static`.

### 2.2 Section Repositories

- Xóa `<p class="sub-heading__languages">Browse 12,348 public repositories across popular languages</p>` (index.html:126).
- Giữ `.sub-heading` + `.sub-heading__title` "Repositories". CSS `.sub-heading__languages` xóa nếu không còn dùng.
- Search-bar (form `.search-bar`): bỏ panel (nền `--surface-muted`, border, padding 16px). Layout: hàng ngang input + 3 nút, gap 8px, `align-items: center`.
- Label "Search repositories": ẩn visual (class `sr-only`: `position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0)`), giữ `for="repository-search"`.
- Icon kính lúp trong input bên trái: dùng `.search-bar__icon` sibling đã có — đặt `.search-bar { position: relative }`, icon `position: absolute; left: 12px; top: 50%; translate: 0 -50%`, input `padding-left: 32px`.
- Nút `.search-bar__nav1/2/3`, `.fitter-btn`: nền `#21262d`, border `#30363d`, text sáng, `box-shadow` nhẹ; `min-height` 36px (mobile 44px giữ).

### 2.3 Header `.site-header`

- Search: thêm icon kính lúp (SVG) bên trái input: `.site-header` thêm `<span class="site-header__search">` bọc `<svg>` + `<input>`. CSS: `position: relative`, icon `absolute; left: 10px; top: 50%; translate: 0 -50%`, input `padding-left: 32px`. Placeholder "Type / to search", giữ `aria-label`. Nền `#21262d`, border `#484f58` (đã có), không đổi token.
- Nav icons (`.site-header__nav`): thứ tự trái → phải: **Copilot** (2 avatar + chevron) → **Create** (+ ▾) → **Issues** (○) → **Pull requests** (git mũi tên) → **Inbox/Notifications** (hộp thư + chấm xanh) → avatar. Bỏ nút Search lặp (`.site-header__nav-item:first-child` hiện đang `display:none` — xóa khỏi DOM).
- Avatar `.site-header__avatar`: tròn (border-radius 50% đã có), placeholder ảnh/initials; bỏ màu vuông hiện tại nếu lệch — giữ nền sáng chữ tối như gốc.

## 3. Ngoài phạm vi

- Không đổi sub-nav tabs (Overview/Repositories/…), badge "Repositories", tab Projects/Packages.
- Không đổi data repo, sparkline/meta repo-card, rename BEM `.right-info*`.
- Không JS, framework, tài nguyên ngoài, build step.

## 4. Verification

1. Desktop scroll: `.right-info` bám cột phải, không trôi.
2. Không còn "Browse 12,348…"; search-bar phẳng, input + 3 nút màu `#21262d`/`#30363d`.
3. Header: search có icon kính lúp; nav icon đúng thứ tự Copilot→Create→Issues→PR→Inbox(+dot)→avatar; không nút search lặp.
4. Mobile `≤767px`: `.right-info` static; header/search responsive không overflow ngang.
5. `git grep -i "Browse 12,348" src/` sạch; `git diff --check` sạch.

## 5. Acceptance checklist nhị phân

- [ ] `.right-info` sticky desktop, static mobile.
- [ ] Dòng "Browse 12,348…" không còn trong HTML/CSS.
- [ ] `.search-bar` không còn nền panel; input + filter đúng màu.
- [ ] Header search có icon kính lúp; bỏ nút search lặp.
- [ ] Nav icons đúng thứ tự gốc; avatar tròn.
- [ ] Không đổi sub-nav; không class BEM mới không cần thiết.
- [ ] `git diff --check` sạch; không tài nguyên ngoài, không JS.
