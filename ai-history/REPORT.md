# Báo cáo lịch sử sử dụng AI

> Hạng mục: dựng HTML/CSS cho bản mô phỏng GitHub Libraries trong worktree `SET2026-11/12-Build-the HTML-CSS-for-the-GitHub-website`.
>
> Người dùng: **Trần Minh Phúc (MPhuc)**.
>
> Ngày được chứng minh: **09/08/2026**. Báo cáo finalized lúc **2026-08-09T18:32:59+07:00**.

---

## 1. Tổng quan

<<<<<<< HEAD
- **Model điều phối chính:** `openai/gpt-5.6-sol`.
- **Tổng số lần dùng AI trong phạm vi hạng mục/worktree này:** **3 lần**.
  - **Lần 1:** log Buổi 16 hiện có tại [`logs/2026-08-09_MPhuc_buoi16-block-layout-bem.md`](logs/2026-08-09_MPhuc_buoi16-block-layout-bem.md).
  - **Lần 2:** log độc lập tại [`logs/2026-08-09_MPhuc_github-libraries-html-css.md`](logs/2026-08-09_MPhuc_github-libraries-html-css.md).
  - **Lần 3:** log độc lập tại [`logs/2026-08-10_MPhuc_github-libraries-fixes.md`](logs/2026-08-10_MPhuc_github-libraries-fixes.md).
- Các log Draw.io cũ là hoạt động của **hạng mục/branch khác**, không thuộc phạm vi đếm của worktree này. Vì vậy tổng số vẫn là **3**.
- **Thời gian bắt đầu lần 2:** không được hệ thống ghi nhận chính xác.
- **Mục đích:** chuyển layout GitHub Libraries sang HTML semantic/CSS thuần; giữ exact class names theo hợp đồng visual/class; bổ sung pagination; triển khai responsive desktop/mobile và hoàn tất review.
- AI không thay thế quyết định của nhóm: các lựa chọn A/B/C do người dùng xác nhận; reviewer, UI QA và arbiter là các cổng đánh giá độc lập.

### Phạm vi kỹ thuật đã chốt

- HTML semantic, CSS thuần, layout bằng **Flexbox**.
- Giữ nguyên tuyệt đối tên class từ nguồn Draw.io V2 bên ngoài worktree hiện tại, kể cả tên không đúng BEM hoặc có lỗi như `Page-title`, `fitter-btn`, `sub-nav_nav1`, `sidebar-info_people`.
- Inventory cuối: **61 class**, gồm 60 class theo Draw.io V2 bên ngoài worktree hiện tại và `.pagination` là block bổ sung duy nhất.
- Responsive: desktop `>= 768px`, mobile `< 768px`; kiểm tra tại `1200px`, `768px`, `767px` và `375px`.
- Không JavaScript, framework, package/dependency, CSS Grid, CDN, font ngoài, iframe, `@import` mạng hoặc tài nguyên HTTP/HTTPS.
- Icon/logo dùng SVG inline; tài nguyên khác chỉ dùng đường dẫn tương đối tới file cục bộ.

### Provenance thiết kế và Git gate

- **Nguồn visual/class contract:** Draw.io **V2 bên ngoài worktree hiện tại**, được dùng làm nguồn ưu tiên trong spec và làm căn cứ cho exact class inventory.
- **Artifact Git V1:** tag `design-v1` tại commit `bd97589`; merge commit `1832ee6` đưa artifact repository V1 vào worktree để thỏa ancestry gate trước triển khai code.
- `design-v1`/`1832ee6` **không phải Draw.io V2 và không thay thế nguồn contract V2**. Đây là distinction bắt buộc khi đọc Git history và tài liệu triển khai.

---
=======
- **Model dùng:** DeepSeek-chat
- **Tổng số lần dùng AI:** ___ lần
- **Dùng cho việc gì:** _(ví dụ: sinh HTML skeleton, sinh CSS từng block, debug lệch layout)_
- **Không dùng AI cho:** _(ví dụ: vẽ layout, quyết định block, viết MOM)_
>>>>>>> 54cd3be (Merge remote-tracking branch 'origin/SET2026-11/12-Build-the-HTML-CSS-for-the-GitHub-website' into SET2026-11/12-Build-the-HTML-CSS-for-the-GitHub-website)

## 2. Bảng thống kê

| # | Ngày | Người | Mục đích | % dùng được | Link log |
|---|---|---|---|---|---|
<<<<<<< HEAD
| 1 | 09/08/2026 | MPhuc | Viết tài liệu Buổi 16 về Block Layout/BEM, tạo spec/plan và chuẩn bị worktree cho hạng mục HTML/CSS | 100% | [log](logs/2026-08-09_MPhuc_buoi16-block-layout-bem.md) |
| 2 | 09/08/2026 | MPhuc | Dựng GitHub Libraries bằng HTML/CSS theo Draw.io V2 bên ngoài worktree hiện tại, giữ 61 class, thêm pagination, responsive và hoàn tất review | 100% final output sau 3 vòng review | [log](logs/2026-08-09_MPhuc_github-libraries-html-css.md) |
| 3 | 10/08/2026 | MPhuc | Fix theo feedback: right-info sticky + bỏ pagination, footer theo gốc, section Repositories (search/filter + bỏ Browse), header icons/search, repo meta + sparkline, align BEM với Draw.io V2 (desktop/mobile sửa tay), mobile header/sparkline/footer; push branch | 100% (mỗi nhóm plan + spec duyệt trước khi code) | [log](logs/2026-08-10_MPhuc_github-libraries-fixes.md) |
=======
| 1 | 06/08 | B | Draw.io → HTML skeleton | | [log](logs/2026-08-06_B_drawio-to-html.md) |
| 2 | 08/08 | C | CSS flexbox cho site-header | | [log](logs/2026-08-08_C_flexbox-header.md) |
| 3 | | | | | |
>>>>>>> 54cd3be (Merge remote-tracking branch 'origin/SET2026-11/12-Build-the-HTML-CSS-for-the-GitHub-website' into SET2026-11/12-Build-the-HTML-CSS-for-the-GitHub-website)

### Cách hiểu tỷ lệ `% dùng được`

Tỷ lệ **100%** của lần 2 áp dụng cho **bản output cuối được chấp nhận**, sau khi `ux-ui` hoàn tất 3 vòng implementation/review và reviewer, UI QA, arbiter approve. Output ban đầu không được coi là đạt ngay: vòng 1 còn lỗi mobile `details`/thứ tự/hamburger, vòng 2 còn lỗi desktop nav bị ẩn; các lỗi này đã được sửa trước khi tính bản cuối.

### Phân biệt phạm vi đếm

Các log Draw.io cũ thuộc branch/hạng mục thiết kế trước đó; chúng không phải bằng chứng thay thế cho nguồn visual/class contract Draw.io V2 bên ngoài worktree hiện tại. Log Buổi 16 là mốc **lần 1** của worktree hiện tại; session HTML/CSS là **lần 2**. Con số “3 lượt” trong log Buổi 16 phản ánh chuỗi hoạt động rộng hơn của lịch sử trước đó, không phải số lần trong phạm vi report này.

---

## 3. Ba prompt hiệu quả nhất

<<<<<<< HEAD
### Prompt #1 — Khóa nguồn chuẩn và exact class contract

> “Giữ nguyên tuyệt đối class Draw.io kể cả lỗi.”

**Vì sao hiệu quả:** ngăn việc tự chuẩn hóa sang kebab-case hoặc BEM đúng chuẩn; giữ được `Page-title`, `popularrepo-card`, `fitter-btn`, `sub-nav_nav1` và `sidebar-info_people`.

### Prompt #2 — Chốt phạm vi layout và hành vi tĩnh

> “Theo Draw.io + pagination; website có mobile responsive; static responsive breakpoint 768, semantic, no JS.”

**Vì sao hiệu quả:** cố định nguồn visual/class contract Draw.io V2 bên ngoài worktree hiện tại, block bổ sung, breakpoint, semantic HTML và giới hạn không JavaScript trong một hợp đồng kiểm tra được.

### Prompt #3 — Ràng buộc tài nguyên và kiểm chứng cụ thể

> “SVG inline/asset local; không dùng Grid, JS, dependency hay external resources; kiểm tra tại 1200/768/767/375 và dùng Tab cho details.”

**Vì sao hiệu quả:** biến yêu cầu giao diện thành các tiêu chí có thể review: local resources, không overflow, đúng breakpoint và keyboard path.

---
=======
### Prompt #1 — _(tên)_

```
(dán prompt)
```

**Vì sao hiệu quả:** _(ví dụ: phần CONSTRAINT chặn AI tự chế block, nên output khớp block-list ngay lần đầu)_

### Prompt #2 — _(tên)_

```
(dán prompt)
```

**Vì sao hiệu quả:**

### Prompt #3 — _(tên)_

```
(dán prompt)
```

**Vì sao hiệu quả:**
>>>>>>> 54cd3be (Merge remote-tracking branch 'origin/SET2026-11/12-Build-the-HTML-CSS-for-the-GitHub-website' into SET2026-11/12-Build-the-HTML-CSS-for-the-GitHub-website)

## 4. Ba lần AI sai và cách nhóm xử lý

| # | Vấn đề phát hiện | Nhóm phát hiện bằng cách nào | Đã sửa thế nào |
|---|---|---|---|
<<<<<<< HEAD
| 1 | Gate ancestry chưa đáp ứng trước khi code: artifact repository V1 cần được đưa vào lịch sử; artifact V1 này không phải nguồn Draw.io V2 bên ngoài worktree hiện tại. | Đối chiếu `CONTRIBUTING.md` với Git context; tag thiết kế chưa thuộc ancestry của nhánh triển khai. | Người dùng cho phép tạo tag `design-v1` tại `bd97589`, sau đó duyệt merge tạo `1832ee6`. Ghi rõ merge này chỉ đưa artifact V1 vào worktree để thỏa gate, không biến V1 thành contract V2. |
| 2 | Vòng triển khai đầu tiên có lỗi mobile ở `details`, thứ tự đọc và hamburger. | Reviewer/UI QA kiểm tra responsive, thứ tự repo-list/sidebar và native control ở viewport mobile. | Điều chỉnh DOM/CSS để mobile dùng `details/summary`, giữ thứ tự đọc một cột và bảo đảm hamburger dùng được bằng bàn phím. |
| 3 | Vòng thứ hai làm desktop nav bị ẩn bởi quy tắc native `details`. | UI QA kiểm tra riêng desktop và phát hiện nav desktop bị ảnh hưởng bởi vùng mobile. | Tách vùng desktop `div` và vùng mobile `details`; vòng thứ ba đạt PASS ở desktop/mobile, không overflow và giữ keyboard behavior. |

### Các lỗi đã ghi trong log lần 1

- Tên worktree có khoảng trắng khiến tên branch Git không hợp lệ; sửa bằng cách giữ tên thư mục nhưng sanitize tên branch bằng dấu `-`.
- Một kiểm tra từ khóa đánh dấu nhầm “placeholder” trong spec; sửa bằng cách đối chiếu nội dung thật và đổi cách diễn đạt để loại false positive.

---

## 5. Bài học rút ra

1. Khi nguồn contract là Draw.io V2 bên ngoài worktree hiện tại, inventory class phải được coi là hợp đồng; không tự sửa spelling hoặc “cải thiện” BEM.
2. Phải tách provenance visual/class V2 khỏi Git ancestry artifact V1: tag `design-v1` và merge `1832ee6` chỉ phục vụ gate lịch sử, không phải nguồn thay thế.
3. Cần kiểm tra gate Git và ancestry trước khi sửa `src/`.
4. Responsive native phải được kiểm tra ở cả `768px` và `767px`; `details/summary` cần tách khỏi nav desktop khi hai chế độ có hành vi hiển thị khác nhau.
5. Acceptance nên ghi bằng evidence nhị phân: 61 class, bốn viewport, không overflow, keyboard path, local resources và verdict độc lập.
=======
| 1 | | | |
| 2 | | | |
| 3 | | | |

## 5. Bài học rút ra

1. _(ví dụ: phải dán danh sách block vào CONTEXT, không thì AI tự chế block mới)_
2. _(ví dụ: AI hay dùng grid dù đã yêu cầu flexbox — cần nhắc lại trong CONSTRAINT)_
3. _(ví dụ: output dài thì AI bỏ qua ràng buộc ở cuối prompt, nên đặt CONSTRAINT trước FORMAT)_
4.
5.
>>>>>>> 54cd3be (Merge remote-tracking branch 'origin/SET2026-11/12-Build-the-HTML-CSS-for-the-GitHub-website' into SET2026-11/12-Build-the-HTML-CSS-for-the-GitHub-website)

---

## Nguyên tắc nhóm đã tuân thủ

<<<<<<< HEAD
- ✅ AI viết/gợi ý, người đọc hiểu và sửa; không copy-paste thẳng vào commit mà không review.
- ✅ Log và report ghi theo phạm vi hạng mục; không cộng nhầm log Draw.io cũ.
- ✅ Không ghi credential, API key, email hoặc secret vào báo cáo/log.
- ✅ Prompt nêu nguồn contract V2, danh sách class và ràng buộc kỹ thuật đã chốt.
- ✅ Không commit trong lúc thực thi plan HTML/CSS; merge Git V1 chỉ thực hiện sau khi người dùng duyệt.
- ✅ Không tuyên bố PR/MR đã tạo khi chưa có evidence; trạng thái hiện tại là **PR pending**.

---

## 6. Lần sử dụng AI thứ 2 trong hạng mục HTML/CSS

Chi tiết đầy đủ, gồm context công khai, transcript 14 lượt, models/tools, thời gian, quyết định, lỗi và evidence nằm trong log độc lập:

[`ai-history/logs/2026-08-09_MPhuc_github-libraries-html-css.md`](logs/2026-08-09_MPhuc_github-libraries-html-css.md)

### Tóm tắt được chấp nhận

- **Mục tiêu:** dựng GitHub Libraries tĩnh bằng `src/index.html` và `src/css/style.css`, bám contract visual/class của Draw.io V2 bên ngoài worktree hiện tại.
- **Context:** `docs/buoi-16-block-layout-bem.md`, spec/plan được duyệt, `docs/block-list.md`, Draw.io V2 bên ngoài worktree hiện tại và Git context của worktree.
- **Lựa chọn:** giữ class exact kể cả lỗi; theo Draw.io V2 + `.pagination`; SVG inline/local; semantic static responsive tại 768/767; không JS/Grid/dependency/external resources.
- **Implementation:** 3 vòng; vòng 1 sửa mobile details/order/hamburger; vòng 2 sửa desktop nav bị ẩn; vòng 3 tách desktop `div` và mobile `details`, PASS.
- **Acceptance/review:** exact 61 classes; UI QA Edge 151 tại `1200x900`, `768x900`, `767x900`, `375x812`; không overflow; `details` dùng được bằng keyboard; reviewer approved; arbiter approve; testbench evidence được tổng hợp.
- **Git provenance:** Draw.io V2 bên ngoài worktree hiện tại là contract; `design-v1` tại `bd97589` và merge `1832ee6` chỉ đưa artifact repository V1 vào ancestry gate, không đại diện cho V2.
- **Trạng thái:** branch exact đã tồn tại; PR/MR **pending**, chưa tuyên bố đã tạo.

---

## 7. Lần sử dụng AI thứ 3 trong hạng mục HTML/CSS

Chi tiết đầy đủ, gồm context công khai, transcript 14 lượt, models/tools, quyết định, lỗi và evidence nằm trong log độc lập:

[`ai-history/logs/2026-08-10_MPhuc_github-libraries-fixes.md`](logs/2026-08-10_MPhuc_github-libraries-fixes.md)

### Tóm tắt được chấp nhận

- **Mục tiêu:** thu hẹp lệch visual giữa clone và bản gốc theo feedback; align BEM với Draw.io V2 do người dùng sửa tay (desktop + mobile).
- **Context:** 6 spec mới `2026-08-10-*.md`; `design/v2/drawio` (drawio + PNG sửa tay); `docs/block-list.md` viết lại; `src/index.html` + `src/css/style.css`.
- **Lựa chọn:** giữ `right-info_people`/`repo-card__title`/`repo-card__body`; bỏ pagination; bỏ Help; bỏ dòng Browse; giữ `.site-header__nav`; rename `popularrepo-card*` → `popular-repos__card*`, `repo-card__desc` → `repo-card__description`, xóa `fitter-btn`; sparkline vào giữa description/meta; mobile header search tròn + ẩn nav; footer mobile order links→logo→©.
- **Implementation:** 6 nhóm thay đổi; mỗi nhóm plan + spec duyệt trước khi code; commit `a12bf60`, `ee3bc8e` + nhóm chưa commit (BEM align, mobile header/sparkline/footer).
- **Acceptance/review:** `git diff --check` sạch; rg xác nhận xóa sạch `popularrepo-card*`/`repo-card__desc`/`fitter-btn`/`pagination`/Browse/Help/`site-header__icon`; class giữ nguyên theo yêu cầu; BEM khớp Draw.io V2 sửa tay.
- **Git:** toàn bộ thay đổi (src, docs, specs, drawio sửa tay) được commit và **push lên branch** `SET2026-11/12-Build-the-HTML-CSS-for-the-GitHub-website` tại remote `origin`.
- **Trạng thái:** đã push branch; không tuyên bố PR/MR.
=======
- ✅ AI viết, người đọc hiểu và sửa — không copy-paste thẳng vào commit
- ✅ Log ngay sau khi dùng, không dồn tới cuối tuần
- ✅ API key để trong `.env`, không commit, không dán vào log
- ✅ Mọi prompt đều kèm danh sách block đã chốt
>>>>>>> 54cd3be (Merge remote-tracking branch 'origin/SET2026-11/12-Build-the-HTML-CSS-for-the-GitHub-website' into SET2026-11/12-Build-the-HTML-CSS-for-the-GitHub-website)
