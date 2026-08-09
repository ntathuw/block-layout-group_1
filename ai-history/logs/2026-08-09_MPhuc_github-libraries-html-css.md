# AI History — MPhuc — GitHub Libraries HTML/CSS

> Log độc lập cho **lần sử dụng AI thứ 2** trong hạng mục/worktree `SET2026-11/12-Build-the HTML-CSS-for-the-GitHub-website`.
>
> Báo cáo tổng hợp liên kết tại [`../REPORT.md`](../REPORT.md).

---

## 1. Tổng quan

- **Người dùng:** Trần Minh Phúc (MPhuc).
- **Ngày được chứng minh:** 09/08/2026.
- **Thời gian bắt đầu:** không được hệ thống ghi nhận chính xác.
- **Report finalized:** `2026-08-09T18:32:59+07:00`.
- **Phạm vi:** lần 2 trong tổng số 2 lần dùng AI của worktree/hạng mục này.
- **Model điều phối chính xác:** `openai/gpt-5.6-sol`.
- **Mục tiêu:** dựng bản mô phỏng tĩnh GitHub Libraries bằng `src/index.html` và `src/css/style.css`.
- **Kết quả tỷ lệ:** 100% cho bản output cuối được chấp nhận; output ban đầu cần sửa qua 3 vòng implementation/review.
- **Không ghi:** email, credential, API key, secret, payload dài hoặc private chain-of-thought.

### Phạm vi đếm

Log Buổi 16 hiện có là lần 1 trong phạm vi worktree này. Các log Draw.io cũ thuộc hạng mục/branch thiết kế khác, không phải bằng chứng thay thế cho nguồn visual/class contract Draw.io V2 bên ngoài worktree hiện tại, nên không được cộng thêm. Do đó lần dùng hiện tại được ghi là **lần 2**, không phải lần 3.

---

## 2. Context công khai đã được duyệt

- `docs/buoi-16-block-layout-bem.md`: Block Layout, BEM, nested block và mix class.
- `docs/superpowers/specs/2026-08-09-github-libraries-html-css-design.md`: spec HTML/CSS tĩnh, class contract, layout, accessibility, resource restrictions và acceptance.
- `docs/superpowers/plans/2026-08-09-github-libraries-html-css.md`: plan HTML semantic, CSS desktop/mobile và verification.
- `docs/block-list.md`: danh sách block và quy ước nhóm.
- Draw.io **V2 bên ngoài worktree hiện tại**: nguồn visual/class contract ưu tiên; exact class names được giữ nguyên kể cả spelling không chuẩn.
- Git context worktree: branch `SET2026-11/12-Build-the-HTML-CSS-for-the-GitHub-website`.
- Source implementation: `src/index.html` và `src/css/style.css`.

### Provenance phải phân biệt

- Draw.io V2 bên ngoài worktree hiện tại là nguồn visual/class contract của lần triển khai.
- Tag `design-v1` trỏ tới `bd97589`.
- Merge commit `1832ee6` đưa **artifact repository V1** vào worktree để thỏa ancestry gate trước code.
- Tag/merge V1 **không phải Draw.io V2**, không chứa ý nghĩa thay thế cho V2 và không được dùng để mô tả sai nguồn contract.

---

## 3. Yêu cầu và quyết định nghiệp vụ

| Quyết định | Nội dung đã chốt |
|---|---|
| Class contract | Giữ tuyệt đối tên class Draw.io V2 bên ngoài worktree hiện tại, kể cả lỗi BEM/spelling như `Page-title`, `fitter-btn`, `sub-nav_nav1`, `sidebar-info_people`. |
| Nguồn layout | Theo Draw.io V2 bên ngoài worktree hiện tại; `.pagination` là block bổ sung duy nhất. |
| Tài nguyên | SVG inline hoặc asset local tương đối; không CDN, font ngoài, iframe hay HTTP/HTTPS resource. |
| Responsive | Desktop `>=768px`; mobile `<768px`; kiểm tra `1200`, `768`, `767`, `375`. |
| Semantics | Dùng `header`, `nav`, `main#main-content`, `aside`, `footer`, skip link và focus visible. |
| Layout | Flexbox; không CSS Grid, JavaScript, framework, dependency, build step hoặc dark mode. |
| Mobile navigation | Native `details/summary`, không cần JavaScript. |
| Scope Git | Tag/merge V1 chỉ để thỏa ancestry gate; không coi V1 là nguồn Draw.io V2 bên ngoài worktree hiện tại. |

---

## 4. Models, tools và subagents

| Vai trò/route | Model chính xác | Hành động công khai |
|---|---|---|
| Primary coordinator | `openai/gpt-5.6-sol` | Điều phối context, lựa chọn, implementation, review và report |
| `context-explorer` | `openai/gpt-5.6-luna` — variant `high` | Khảo sát repository, docs, spec, plan, source và Git context |
| `brainstorm` | `openai/gpt-5.6-sol` — variant `medium` | So sánh các phương án triển khai |
| `brain-sol-medium` | `openai/gpt-5.6-sol` — variant `medium` | Hỗ trợ lập/kiểm tra hướng giải quyết |
| `doc-writer` | `openai/gpt-5.6-luna` — variant `high` | Viết spec, plan, log và report Markdown |
| `ux-ui` | `openai/gpt-5.6-sol` — variant `medium` | Dựng và sửa HTML/CSS qua 3 vòng |
| `reviewer` | `openai/gpt-5.6-sol` — variant `medium` | Review độc lập |
| `arbiter` | `openai/gpt-5.6-sol` — variant `medium` | Verdict cuối: approve |
| `ui-qa` | `openai/gpt-5.6-sol` — variant `medium` | UI/keyboard QA bằng Edge 151 |
| `testbench` | `openai/gpt-5.6-sol` — variant `low` | Tổng hợp acceptance/test evidence |
| `luna-ops` | `ds/deepseek-v4-flash` | Được gọi theo yêu cầu để kiểm tra branch/PR; không có tuyên bố PR đã tạo |
| Grok worker | — | Không được dispatch |

### Nhóm công cụ/nghiệp vụ

- **Context:** đọc README identity, docs Buổi 16, Draw.io, spec, plan, source HTML/CSS, `CONTRIBUTING.md` và Git worktree metadata.
- **Implementation:** route `ux-ui` chỉnh giao diện theo contract đã duyệt.
- **Review:** `reviewer`, `testbench`, `ui-qa` cung cấp evidence; `arbiter` đưa verdict approve.
- **Git:** kiểm tra tag `design-v1`, ancestry và merge `1832ee6`; sau gate merge thiết kế đã được duyệt, không tạo commit implementation/report mới và chưa tạo PR/MR.
- **Documentation:** log này là artifact độc lập và liên kết ngược tới `ai-history/REPORT.md`.

---

## 5. Transcript công khai theo thứ tự nghiệp vụ

Các khối hướng dẫn bootstrap/superpowers dài được loại khỏi transcript vì đó là **platform/operational instruction**, không phải nội dung nghiệp vụ. Bảng dưới chỉ ghi quote và response/action công khai; không ghi private chain-of-thought.

| # | User quote | Assistant response/action công khai |
|---|---|---|
| 1 | “Dựng lại GitHub Libraries bằng HTML + CSS, Block Layout + BEM; tôi cung cấp docs và Draw.io, gọi `ux-ui`.” | Đọc docs/Draw.io, xác định phạm vi HTML/CSS tĩnh và chuyển phần dựng giao diện cho route `ux-ui`; giữ các cổng review độc lập. |
| 2 | “Chọn B: giữ nguyên tuyệt đối class Draw.io kể cả lỗi.” | Khóa exact class contract của Draw.io V2 bên ngoài worktree hiện tại; không chuẩn hóa tên, không sửa spelling và không tự đổi sang BEM chuẩn. |
| 3 | “Chọn C: theo Draw.io + pagination.” | Chọn Draw.io V2 bên ngoài worktree hiện tại làm nguồn ưu tiên, bổ sung `.pagination`, không thêm block/utility/component class khác. |
| 4 | “Chọn A: SVG inline/asset local.” | Chốt icon/logo bằng SVG inline và chỉ cho phép asset local tương đối; loại external resources. |
| 5 | “Chọn A: static responsive breakpoint 768, semantic, no JS.” | Khóa desktop `>=768px`, mobile `<768px`, semantic landmarks, Flexbox và native `details/summary`; loại JavaScript, Grid, dependency và API. |
| 6 | “Tôi muốn website và mobile responsive; duyệt phương án A.” | Trình bày ba phương án; sau khi người dùng chọn, ghi phương án A làm hướng triển khai cho website desktop/mobile responsive. |
| 7 | “Duyệt spec.” | Viết spec `2026-08-09-github-libraries-html-css-design.md` với mục tiêu, exact class inventory, layout, tài nguyên, accessibility, exclusions và acceptance checklist. |
| 8 | “Duyệt plan.” | Viết plan `2026-08-09-github-libraries-html-css.md`, chia task HTML, CSS desktop, CSS mobile/focus và final verification. |
| 9 | “Gate `design-v1` đang thiếu; cho phép tạo tag.” | Dừng ở gate ancestry; ghi nhận tag `design-v1` tại `bd97589` cần có trước code. Tag này đại diện cho artifact repository V1, không phải Draw.io V2 bên ngoài worktree hiện tại. |
| 10 | “Tag không thuộc ancestry; tôi duyệt merge `design-v1`.” | Xác nhận tag chưa nằm trong ancestry ban đầu; sau phê duyệt, merge artifact V1 vào worktree tạo `1832ee6` để thỏa gate. Không dùng merge này để thay thế nguồn contract Draw.io V2 bên ngoài worktree hiện tại. |
| 11 | “Tiếp tục sửa theo kết quả reviewer/UI QA.” | `ux-ui` thực hiện 3 vòng: vòng 1 sửa lỗi mobile `details`/thứ tự/hamburger; vòng 2 sửa lỗi desktop nav bị native `details` ẩn; vòng 3 tách desktop `div` và mobile `details`, đạt PASS. |
| 12 | “Hoàn tất evidence reviewer, testbench, UI QA; arbiter approve.” | Tổng hợp evidence: exact 61 class; UI QA Edge 151 tại `1200x900`, `768x900`, `767x900`, `375x812`; không overflow; `details` dùng được bằng keyboard; reviewer approved và arbiter approve. |
| 13 | “Viết REPORT đầy đủ; lần dùng hiện tại là lần 2; gọi `luna-ops` tạo branch/PR.” | Cập nhật scope count thành 2; giữ log Buổi 16 là lần 1; ghi nhận route `luna-ops` và kiểm tra trạng thái branch/PR mà không tuyên bố PR đã tạo. |
| 14 | “Branch Git-safe đã tồn tại; dùng exact branch `SET2026-11/12-Build-the-HTML-CSS-for-the-GitHub-website` và chuẩn bị PR/MR.” | Xác nhận worktree dùng đúng branch exact; chuẩn bị trạng thái cho PR/MR nhưng chưa ghi là đã tạo. Trạng thái cuối: **PR pending**. |

---

## 6. Implementation, lỗi và cách sửa

### Ba implementation iterations

1. **Vòng 1:** reviewer/UI QA phát hiện lỗi mobile ở `details`, thứ tự đọc và hamburger; chỉnh DOM/CSS cho native mobile navigation và thứ tự một cột.
2. **Vòng 2:** UI QA phát hiện desktop nav bị quy tắc native `details` ẩn; tách riêng cấu trúc hiển thị desktop/mobile.
3. **Vòng 3:** desktop dùng `div`, mobile dùng `details/summary`; đạt PASS.

### Các lỗi khác đã ghi trong log lần 1

- Tên worktree có khoảng trắng làm tên branch Git lỗi; giữ tên thư mục, sanitize tên branch.
- Kiểm tra từ khóa đánh dấu nhầm “placeholder” trong spec; đối chiếu nội dung và đổi cách diễn đạt.

---

## 7. Acceptance và review evidence

- Exact **61 classes**; `.pagination` là block bổ sung duy nhất.
- UI QA bằng Edge 151 tại `1200x900`, `768x900`, `767x900`, `375x812`.
- Không có horizontal overflow; mobile một cột; repo list đứng trước sidebar; pagination dùng được.
- `details/summary` và keyboard path được kiểm tra; semantic landmarks, focus và accessible names được review.
- SVG inline/asset local; không JavaScript, Grid, dependency hoặc external resources.
- Reviewer **approved**; UI QA **PASS**; testbench evidence được tổng hợp; arbiter **approve**.
- Git: tag `design-v1` tại `bd97589`, merge `1832ee6` chỉ đưa artifact repository V1 vào ancestry gate; Draw.io V2 bên ngoài worktree hiện tại vẫn là visual/class contract.
- Branch exact đã tồn tại; PR/MR **pending**.

---

## 8. Trạng thái cuối

Output cuối đạt acceptance/review sau 3 vòng sửa. Log này là artifact độc lập cho lần dùng AI thứ 2 và đã liên kết về [`ai-history/REPORT.md`](../REPORT.md). Không có commit implementation/report mới nào được tạo sau gate merge thiết kế đã được duyệt; merge commit `1832ee6` vẫn là fact lịch sử. PR/MR vẫn **pending**.

### Nguyên tắc nhóm đã tuân thủ

- ✅ AI viết/gợi ý, người đọc hiểu và sửa; không copy-paste thẳng vào commit mà không review.
- ✅ Log ghi ngay theo context và phạm vi hạng mục.
- ✅ Không ghi credential, API key, email hoặc secret.
- ✅ Prompt giữ rõ nguồn Draw.io V2, exact class inventory và các constraint.
- ✅ Không tạo commit implementation/report mới sau gate merge thiết kế đã được duyệt; PR/MR chỉ ở trạng thái pending khi chưa có evidence tạo thành công.
