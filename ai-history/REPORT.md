# AI History Report

> Báo cáo tổng hợp việc dùng AI (DeepSeek) trong bài tập Block Layout — GitHub Library.
> Viết vào ngày 09/08, sau khi đã có đủ log trong `ai-history/logs/`.

---

## 1. Tổng quan

- **Model dùng:** DeepSeek-chat (ds/deepseek-v4-flash)
- **Tổng số lần dùng AI:** 2 lần
- **Dùng cho việc gì:** verify bản vẽ draw.io theo `docs/block-list.md`; cập nhật draw.io sang V2 BEM naming; dựng + chỉnh layout GitHub Libraries (header gộp sub-nav, block `.right-info`, dark theme, full-bleed site-header + nav icons, responsive mobile/desktop parity); viết spec/plan trước khi thực thi.
- **Không dùng AI cho:** vẽ hình khối trong draw.io (vẽ tay + kéo thả), quyết định block/class (đã chốt ở MOM-01), viết MOM.

## 2. Bảng thống kê

| # | Ngày | Người | Mục đích | % dùng được | Link log |
|---|---|---|---|---|---|
| 1 | 08/08 | MPhuc | Draw.io → verify block-list, chuẩn bị commit + PR | 100 | [log](logs/2026-08-08_MPhuc_drawio-layout.md) |
| 2 | 09/08 | MPhuc | Draw.io V2 BEM naming + GitHub Libraries layout V2 (header, right-info, dark, responsive) + push + PR | 100 | [log drawio](logs/2026-08-09_MPhuc_drawio-v2-bem.md) · [log full](logs/2026-08-09_MPhuc_github-libraries-layout-v2-full.md) |

> Mỗi người tối thiểu 2 log. Tổng tối thiểu 6 log.

## 3. Ba prompt hiệu quả nhất

### Prompt #1 — Khóa contract class khi đổi tên block

```
Đổi nhánh class sidebar-info → right-info:
- right-info, right-info_people, right-info__heading, right-info__description, right-info__meta
- KHÔNG thêm element BEM mới; dòng ngôn ngữ reuse right-info__meta; Report abuse style .right-info a
```

**Vì sao hiệu quả:** phần CONSTRAINT chặn AI tự chế block/element, nên HTML/CSS và draw.io V2 đồng bộ đúng class set đã chốt ngay lần đầu.

### Prompt #2 — 1 DOM cho 2 breakpoint (desktop cột phải / mobile gần footer)

```
Gộp popular + repos + list + pagination vào 1 cột trái (div trong .main-layout);
.right-info là sibling cuối → desktop flex row (cột phải ~296px, sticky),
mobile column (People sau pagination, gần footer). Không absolute.
```

**Vì sao hiệu quả:** giải đúng root cause "right-info chỉ pair với popular", tránh hack absolute dễ vỡ; khớp cả desktop (People cột cao) và mobile (People gần footer).

### Prompt #3 — Dark theme + full-bleed header theo token

```
Đổi toàn bộ :root sang dark GitHub; site-header + sub-nav full-bleed;
1 search-bar; thêm .site-header__nav (5 icon) trước avatar.
```

**Vì sao hiệu quả:** thay đổi nằm gọn trong token + layout header nên desktop/mobile nhất quán, không phá responsive; `git diff --check` sạch.

## 4. Ba lần AI sai và cách nhóm xử lý

| # | AI sai gì | Nhóm phát hiện bằng cách nào | Đã sửa thế nào |
|---|---|---|---|
| 1 | Đặt `.right-info` cạnh `.repo-list` → desktop People chỉ mảnh nhỏ, Repositories full-width | So screenshot clone vs gốc | Tách cột trái (popular → pagination) vào 1 div; `.right-info` sibling cuối; flex row desktop + column mobile |
| 2 | Mobile header 3 hàng (search full-width + thanh "Explore libraries") thay vì 1 hàng | So ảnh mobile gốc | Ẩn input full-width, hiện icon search trong `.site-header__nav`; sub-nav tab ngang 2+1 + More |
| 3 | Draw.io V2 bị lưu đè 2 nhãn `right-info` → `sidebar-info` | `git status` + grep trong file v2 | replaceAll `sidebar-info` → `right-info` trong drawio; đồng bộ PNG (export lại tay) |

## 5. Bài học rút ra

1. Phải dán danh sách class/block vào CONTEXT và CONSTRAINT, không thì AI tự chế block mới hoặc đổi tên.
2. AI hay đặt block theo thứ tự DOM "tình cờ" — cần chỉ định rõ "1 cột trái + aside phải" ngay từ spec để không phải refactor.
3. Mỗi lần chỉnh draw.io bằng app phải grep lại nhãn class trước commit — dễ bị lưu đè bản cũ.
4. Mobile parity phải kiểm tra theo cặp ảnh gốc/clone và QA ở 1200/768/767/375px.
5. Spec/plan trước, thực thi sau; ràng buộc ngoại lệ class (vd `.site-header__nav`) phải ghi rõ trong prompt.

---

## Nguyên tắc nhóm đã tuân thủ

- ✅ AI viết, người đọc hiểu và sửa — không copy-paste thẳng vào commit
- ✅ Log ngay sau khi dùng, không dồn tới cuối tuần
- ✅ API key để trong `.env`, không commit, không dán vào log
- ✅ Mọi prompt đều kèm danh sách block/class đã chốt
- ✅ PR update + request review chỉ tuyên bố sau khi đã push và có evidence
