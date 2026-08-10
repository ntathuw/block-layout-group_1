# AI History — Minh Phúc (09/08/2026)

> Log dùng AI (DeepSeek) để cập nhật bản vẽ draw.io sang V2 (BEM naming) — Web + Mobile.
> Viết theo format của `ai-history/REPORT.md`.

---

## 1. Tổng quan

- **Model dùng:** DeepSeek-chat (ds/deepseek-v4-flash)
- **Tổng số lần dùng AI:** 2 lượt (lượt này là lần thứ 2)
- **Người dùng:** Trần Minh Phúc (MPhuc)
- **Thời gian:** 09/08/2026 ~16:15
- **Dùng cho việc gì:** rà soát bản vẽ `design/v1/drawio/Blocklayout-BEM-Github(v2).drawio` (đã đổi sang BEM naming theo `docs/block-list.md`), chuẩn bị commit thay thế file V1 + push nhánh `SET26-7-MPhuc-Digitize-the-layout-using-draw.io—Mobile-Desktop`, viết log lần 2 này.
- **Không dùng AI cho:** vẽ hình khối trong draw.io (vẽ tay + kéo thả), quyết định block (đã chốt ở MOM-01).

## 2. Bảng thống kê

| # | Ngày | Người | Mục đích | % dùng được | Link log |
|---|---|---|---|---|---|
| 1 | 08/08 | MPhuc | Draw.io → verify block-list, chuẩn bị commit + PR | 100 | [log](2026-08-08_MPhuc_drawio-layout.md) |
| 2 | 09/08 | MPhuc | Cập nhật bản vẽ draw.io → V2 BEM naming, push nhánh, viết log | 100 | [log](2026-08-09_MPhuc_drawio-v2-bem.md) |

## 3. Ba prompt hiệu quả nhất

### Prompt #1 — Rà soát tên block trong bản vẽ V2

```
Kiểm tra design/v1/drawio/Blocklayout-BEM-Github(v2).drawio:
- Đối chiếu tên class BEM trong file với docs/block-list.md (8 block)
- Báo block nào thiếu, lệch tên hoặc tạo mới không có trong danh sách
```

**Vì sao hiệu quả:** AI trả về bảng đối chiếu nhanh theo đúng 8 block nguồn sự thật, xác nhận V2 đã chuẩn BEM (`repo-card__title`, `repo-card__meta`...), không phát sinh block chế thêm.

### Prompt #2 — Commit + push nhánh theo quy ước

```
Thay thế file design/v1/drawio V1 bằng V2:
- add file Blocklayout-BEM-Github(v2).drawio + PNG export
- track xóa 2 file V1 cũ
- commit type "design", push lên nhánh hiện tại
```

**Vì sao hiệu quả:** Prompt ghi rõ thao tác (add mới, track xóa cũ) và type `design` nên git history sạch, đúng quy ước repo.

### Prompt #3 — Viết AI log theo format REPORT.md

```
Viết 1 file AI log lần 2 theo format của ai-history/REPORT.md
cho lượt dùng này, ghi đầy đủ context, conversation, thời gian,
model, tên người dùng, số lần sử dụng.
```

**Vì sao hiệu quả:** Bám sát cấu trúc 5 mục + nguyên tắc của REPORT.md nên log đồng bộ, cuối kỳ gộp vào REPORT không phải sửa lại.

## 4. Ba lần AI sai và cách nhóm xử lý

| # | AI sai gì | Nhóm phát hiện bằng cách nào | Đã sửa thế nào |
|---|---|---|---|
| 1 | _(chưa ghi nhận lần sai nào trong lượt này)_ | | |

## 5. Bài học rút ra

1. Đối chiếu bản vẽ draw.io với `docs/block-list.md` mỗi lần đổi tên/version — tránh lệch nguồn sự thật.
2. Khi thay thế file cùng mục đích, ghi rõ "add file mới + track xóa file cũ" trong prompt để git history gọn.
3. Log AI viết ngay sau khi dùng, theo đúng format REPORT.md, đánh số lần dùng liên tục.
4.
5.

---

## Nguyên tắc nhóm đã tuân thủ

- ✅ AI viết, người đọc hiểu và sửa — không copy-paste thẳng vào commit
- ✅ Log ngay sau khi dùng, không dồn tới cuối tuần
- ✅ API key để trong `.env`, không commit, không dán vào log
- ✅ Mọi prompt đều kèm danh sách block đã chốt
