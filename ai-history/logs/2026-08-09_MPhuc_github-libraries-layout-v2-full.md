# AI History — Minh Phúc (09/08/2026) — GitHub Libraries Layout V2 (đầy đủ)

> Log dùng AI (DeepSeek) để chỉnh bản clone GitHub Libraries khớp bản gốc: header gộp sub-nav, block `.right-info`, dark theme, full-bleed site-header + nav icons, responsive mobile/desktop parity, chuyển bản vẽ draw.io sang V2.
> Viết theo format của `ai-history/REPORT.md` (đường dẫn `block-layout-group_1/ai-history/REPORT.md`).

---

## 1. Tổng quan

- **Model dùng:** DeepSeek-chat (ds/deepseek-v4-flash)
- **Tổng số lần dùng AI:** 2 lần (lượt này là lần thứ 2)
- **Người dùng:** Trần Minh Phúc (MPhuc)
- **Thời gian:** 09/08/2026, khoảng **16:15 → 20:44 (+07:00)** (session làm việc chính; một phần log draw.io V2 riêng ghi lúc ~16:15 tại [`2026-08-09_MPhuc_drawio-v2-bem.md`](2026-08-09_MPhuc_drawio-v2-bem.md))
- **Phạm vi:** worktree `12-Build-the HTML-CSS-for-the-GitHub-website` (branch `SET2026-11/12-Build-the-HTML-CSS-for-the-GitHub-website`) + bản vẽ draw.io V2 (`design/v2/drawio/`).
- **Dùng cho việc gì:**
  - Brainstorm + spec + plan cho loạt chỉnh layout GitHub Libraries.
  - Chuyển bản vẽ draw.io sang V2: đổi nhãn `sidebar-info*` → `right-info*`, copy vào `design/v2/drawio/`, xóa `design/v1/`.
  - HTML/CSS: header gộp `.sub-nav` vào `.header`; rename block `.right-info` (People / Top languages / Report abuse); dark theme toàn trang; footer căn giữa + bổ sung link; site-header full-bleed + 1 search-bar + cụm icon `.site-header__nav`.
  - Responsive parity mobile (header 1 hàng, sub-nav 2+1 + More, profile ghost Follow, filters ngang, languages ngang, footer compact) và desktop (`.right-info` cột phải full-height cạnh Popular + Repositories gọn cột trái).
- **Không dùng AI cho:** vẽ hình khối draw.io (tay + kéo thả), quyết định block/class (đã chốt ở MOM-01 và spec), viết MOM.

## 2. Bảng thống kê

| # | Ngày | Người | Mục đích | % dùng được | Link log |
|---|---|---|---|---|---|
| 1 | 08/08 | MPhuc | Draw.io → verify block-list, chuẩn bị commit + PR | 100 | [log](2026-08-08_MPhuc_drawio-layout.md) |
| 2 | 09/08 | MPhuc | Draw.io V2 BEM naming + GitHub Libraries layout V2 (header, right-info, dark, responsive) + push + PR | 100 (sau 1 vòng chỉnh + QA) | [log](2026-08-09_MPhuc_github-libraries-layout-v2-full.md) · [log drawio-v2](2026-08-09_MPhuc_drawio-v2-bem.md) |

## 3. Ba prompt hiệu quả nhất

### Prompt #1 — Khóa contract class khi đổi tên block

```
Đổi nhánh class sidebar-info → right-info:
- right-info, right-info_people, right-info__heading, right-info__description, right-info__meta
- KHÔNG thêm element BEM mới; dòng ngôn ngữ reuse right-info__meta; Report abuse style .right-info a
```

**Vì sao hiệu quả:** giữ đúng class set đã chốt với bản vẽ V2, không tự chế thêm block/element; đồng bộ được HTML/CSS và draw.io trong 1 lượt.

### Prompt #2 — Tách 1 DOM phục vụ 2 breakpoint (desktop cột phải / mobile gần footer)

```
Gộp popular + repos + list + pagination vào 1 cột trái (div trong .main-layout);
.right-info là sibling cuối → desktop flex row (cột phải ~296px, sticky),
mobile column (People sau pagination, gần footer). Không absolute.
```

**Vì sao hiệu quả:** giải đúng gốc rễ "right-info chỉ pair với popular" bằng DOM + flex, tránh hack absolute dễ vỡ responsive; khớp cả image desktop (People cột cao) và mobile (People gần footer).

### Prompt #3 — Dark theme + full-bleed header theo token

```
Đổi toàn bộ :root sang dark GitHub (surface/border/link/focus);
site-header + sub-nav full-bleed bỏ max-width 1200; 1 search-bar;
thêm .site-header__nav (5 icon) trước avatar.
```

**Vì sao hiệu quả:** thay đổi chỉ nằm trong token + layout header nên desktop/mobile nhất quán, không phá responsive cũ; `git diff --check` sạch.

## 4. Ba lần AI sai và cách nhóm xử lý

| # | AI sai gì | Nhóm phát hiện bằng cách nào | Đã sửa thế nào |
|---|---|---|---|
| 1 | Ban đầu đặt `.right-info` cạnh `.repo-list` (trong `.main-layout`), nên desktop People chỉ là mảnh nhỏ cạnh Popular và Repositories full-width dưới | Đối chiếu screenshot clone vs gốc (image-1/2, image-3/4) | Tách cột trái (popular → pagination) vào 1 div, `.right-info` là sibling cuối; flex row desktop + column mobile |
| 2 | Mobile header lúc đầu 3 hàng (search full-width + thanh "Explore libraries") thay vì 1 hàng như gốc | So ảnh mobile gốc: 1 hàng ☰·logo·name·🔍·inbox·avatar | Ẩn input full-width, hiện icon search trong `.site-header__nav`, sub-nav chuyển thành tab ngang 2+1 + More |
| 3 | Bản draw.io V2 trong working tree bị đổi ngược 2 nhãn `.right-info` → `.sidebar-info` (do thao tác lưu app) | `git status` + `Select-String sidebar-info` trong file v2 | replaceAll `sidebar-info` → `right-info` trong drawio, đồng bộ lại PNG (export lại tay nếu cần) |

## 5. Bài học rút ra

1. Vị trí block trong DOM quyết định layout cả 2 breakpoint — thiết kế DOM theo "cột trái + aside phải" từ đầu, không pair aside với block ngẫu nhiên.
2. Mỗi lần chỉnh draw.io bằng app phải kiểm tra lại nhãn class (grep `sidebar-info`/`right-info`) trước commit — dễ bị lưu đè bản cũ.
3. Mobile parity cần kiểm tra từng cặp ảnh gốc/clone và sửa đúng "1 DOM cho cả desktop + mobile", không nên absolute.
4. Ràng buộc "không thêm class ngoài contract" giúp output nhất quán nhưng cần chỉ định rõ ngoại lệ (vd `.site-header__nav`) trong prompt.
5. Viết spec/plan rồi mới thực thi, và QA ở cả 1200/768/767/375px để bắt lỗi regress.

---

## Nguyên tắc nhóm đã tuân thủ

- ✅ AI viết/gợi ý, người đọc hiểu và sửa — không copy-paste thẳng vào commit mà không review.
- ✅ Log ngay sau khi dùng, theo format REPORT.md, đánh số lần dùng liên tục (lần này = lần 2).
- ✅ API key để trong `.env`, không commit, không dán vào log.
- ✅ Mọi prompt đều kèm danh sách block/class đã chốt.
- ✅ Không tuyên bố PR đã tạo khi chưa push; PR update + request review ghi rõ trạng thái.
