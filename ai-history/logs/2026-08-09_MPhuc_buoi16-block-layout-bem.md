# AI History — Minh Phúc (09/08/2026)

> Log dùng AI (DeepSeek) để viết tài liệu Buổi 16 — Block Layout và quy tắc BEM, tạo worktree cho công việc HTML/CSS GitHub website.
> Viết theo format của `ai-history/REPORT.md`.

---

## 1. Tổng quan

- **Model dùng:** DeepSeek-chat (ds/deepseek-v4-flash)
- **Tổng số lần dùng AI:** 3 lượt (lượt này là lần thứ 3)
- **Người dùng:** Trần Minh Phúc (MPhuc)
- **Thời gian:** 09/08/2026 ~16:45
- **Dùng cho việc gì:** viết tài liệu `docs/buoi-16-block-layout-bem.md` (Block Layout + BEM theo `docs/block-list.md`), tạo spec + plan tại `docs/superpowers/`, tạo worktree `SET2026-11/12-Build-the HTML-CSS-for-the-GitHub-website` (base từ `main`, không đụng nhánh gốc).
- **Không dùng AI cho:** quyết định nội dung kiến thức Buổi 16 (nội dung do thầy/giáo trình cung cấp), danh sách block (đã chốt ở MOM-01).

## 2. Bảng thống kê

| # | Ngày | Người | Mục đích | % dùng được | Link log |
|---|---|---|---|---|---|
| 1 | 08/08 | MPhuc | Draw.io → verify block-list, chuẩn bị commit + PR | 100 | [log](2026-08-08_MPhuc_drawio-layout.md) |
| 2 | 09/08 | MPhuc | Cập nhật bản vẽ draw.io → V2 BEM naming, push nhánh, viết log | 100 | [log](2026-08-09_MPhuc_drawio-v2-bem.md) |
| 3 | 09/08 | MPhuc | Viết tài liệu Buổi 16 Block Layout + BEM, tạo worktree, viết log | 100 | [log](2026-08-09_MPhuc_buoi16-block-layout-bem.md) |

## 3. Ba prompt hiệu quả nhất

### Prompt #1 — Tạo tài liệu Buổi 16 theo nội dung có sẵn

```
Viết file markdown "BUỔI 16: BLOCK LAYOUT VÀ QUY TẮC BEM"
tại docs/buoi-16-block-layout-bem.md với nội dung:
Block Layout (tư duy, quy tắc phân tích), BEM (Block/Element/Modifier,
Two Dashes Style), quy tắc lồng khối tránh anti-pattern, kỹ thuật Mix
```

**Vì sao hiệu quả:** AI giữ nguyên nội dung lý thuyết do người cung cấp, chỉ chuyển sang Markdown có cấu trúc heading + code fence rõ ràng, ví dụ Mix `<button class="button card__button">` đúng nguyên văn.

### Prompt #2 — Tạo worktree cô lập, không đụng nhánh gốc

```
Tạo git worktree mới mang tên
"SET2026-11/12-Build-the HTML-CSS-for-the-GitHub-website"
từ nhánh main, giữ main nguyên trạng, để thực thi công việc tiếp theo
```

**Vì sao hiệu quả:** Prompt xác định rõ base là `main` và yêu cầu không thay đổi `main`, nên branch mới tách riêng biệt, không kéo theo commit của nhánh vẽ draw.io, không phát sinh merge nhầm.

### Prompt #3 — Viết AI log theo format REPORT.md

```
Viết 1 file AI log lần 3 theo format của ai-history/REPORT.md
cho lượt dùng này, ghi đầy đủ context, conversation, thời gian,
model, tên người dùng, số lần sử dụng.
```

**Vì sao hiệu quả:** Bám sát cấu trúc 5 mục + nguyên tắc của REPORT.md nên log đồng bộ, cuối kỳ gộp vào REPORT không phải sửa lại.

## 4. Ba lần AI sai và cách nhóm xử lý

| # | AI sai gì | Nhóm phát hiện bằng cách nào | Đã sửa thế nào |
|---|---|---|---|
| 1 | Lần đầu tạo worktree bằng tên có khoảng trắng làm tên branch Git lỗi (`invalid branch name`) | Chạy `git worktree add` thấy fatal | Giữ nguyên tên thư mục worktree có khoảng trắng theo yêu cầu, tên branch Git chuyển khoảng trắng thành `-` |
| 2 | Spec tự kiểm tra gắn cờ nhầm từ "placeholder" khi grep | Đối chiếu lại nội dung spec | Đổi cách diễn đạt tiêu chí, loại false positive |

## 5. Bài học rút ra

1. Tên branch Git không cho phép khoảng trắng — nếu yêu cầu tên worktree có khoảng trắng, để nguyên ở tên thư mục, tên branch phải sanitize.
2. Worktree nên tạo base từ `main` để công việc mới không phụ thuộc các nhánh feature khác đang treo.
3. Log AI viết ngay sau khi dùng, theo đúng format REPORT.md, đánh số lần dùng liên tục.
4.
5.

---

## Nguyên tắc nhóm đã tuân thủ

- ✅ AI viết, người đọc hiểu và sửa — không copy-paste thẳng vào commit
- ✅ Log ngay sau khi dùng, không dồn tới cuối tuần
- ✅ API key để trong `.env`, không commit, không dán vào log
- ✅ Mọi prompt đều kèm danh sách block đã chốt
