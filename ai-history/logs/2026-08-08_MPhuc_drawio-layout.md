# AI History — Minh Phúc (08/08/2026)

> Log dùng AI (DeepSeek) để digitize block layout lên draw.io — Web + Mobile.
> Viết theo format của `ai-history/REPORT.md`.

---

## 1. Tổng quan

- **Model dùng:** DeepSeek-chat (ds/deepseek-v4-flash)
- **Tổng số lần dùng AI:** 1 lượt (session tạo nhánh + soạn log)
- **Dùng cho việc gì:** kiểm tra đối chiếu file `design/v1/drawio/Block-layout-V1.drawio` với `docs/block-list.md`, tạo nhánh `SET26-7-MPhuc-Digitize-the-layout-using-draw.io—Mobile-Desktop`, chuẩn bị commit + PR, viết log này.
- **Không dùng AI cho:** vẽ hình khối trong draw.io (vẽ tay + kéo thả), quyết định block (đã chốt ở MOM-01).

## 2. Bảng thống kê

| # | Ngày | Người | Mục đích | % dùng được | Link log |
|---|---|---|---|---|---|
| 1 | 08/08 | MPhuc | Draw.io → verify block-list, chuẩn bị commit + PR | 100 | [log](2026-08-08_MPhuc_drawio-layout.md) |

## 3. Ba prompt hiệu quả nhất

### Prompt #1 — Kiểm tra file draw.io có khớp block-list không

```
Kiểm tra file design/v1/drawio/Block-layout-V1.drawio:
- Đối chiếu tên class trong file với docs/block-list.md (8 block)
- Báo block nào thiếu hoặc lệch tên
```

**Vì sao hiệu quả:** Trả về kết quả đối chiếu nhanh, xác nhận file draw.io dùng đúng tên block (`site-header`, `search-bar`, `repo-card`...), không phát sinh block chế thêm.

### Prompt #2 — Chuẩn bị nhánh + commit theo CONTRIBUTING

```
Tạo nhánh tên "SET26-7-MPhuc-Digitize-the-layout-using-draw.io—Mobile-Desktop",
commit file draw.io + PNG export theo quy ước type "design",
tạo PR tiêu đề "design: draw.io drawn block layout (Web + Mobile)".
```

**Vì sao hiệu quả:** Prompt ghi rõ tên nhánh và tiêu đề PR theo đúng yêu cầu → AI tạo đúng, không tự đổi tên.

### Prompt #3 — Viết AI log theo format REPORT.md

```
Viết 1 file AI log theo format của ai-history/REPORT.md cho lượt dùng này.
```

**Vì sao hiệu quả:** Bám sát cấu trúc 5 mục + nguyên tắc của REPORT.md nên log đồng bộ, sau này gộp vào REPORT cuối kỳ không phải sửa lại.

## 4. Ba lần AI sai và cách nhóm xử lý

| # | AI sai gì | Nhóm phát hiện bằng cách nào | Đã sửa thế nào |
|---|---|---|---|
| 1 | _(chưa ghi nhận lần sai nào trong lượt này)_ | | |

## 5. Bài học rút ra

1. Phải đối chiếu file draw.io với `docs/block-list.md` trước khi commit — tránh AI/tự vẽ tạo block mới lệch nguồn sự thật.
2. Ghi rõ tên nhánh + tiêu đề PR trong prompt để output khớp yêu cầu ngay lần đầu.
3. Log AI viết ngay sau khi dùng, theo đúng format REPORT.md để cuối tuần chỉ việc gộp.

---

## Nguyên tắc nhóm đã tuân thủ

- ✅ AI viết, người đọc hiểu và sửa — không copy-paste thẳng vào commit
- ✅ Log ngay sau khi dùng, không dồn tới cuối tuần
- ✅ API key để trong `.env`, không commit, không dán vào log
- ✅ Mọi prompt đều kèm danh sách block đã chốt
