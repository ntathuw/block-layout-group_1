# AI History Report

> Báo cáo tổng hợp việc dùng AI (DeepSeek) trong bài tập Block Layout — GitHub Library.
> Viết vào ngày 09/08, sau khi đã có đủ log trong `ai-history/logs/`.

---

## 1. Tổng quan

- **Model dùng:** DeepSeek-chat
- **Tổng số lần dùng AI:** ___ lần
- **Dùng cho việc gì:** _(ví dụ: sinh HTML skeleton, sinh CSS từng block, debug lệch layout)_
- **Không dùng AI cho:** _(ví dụ: vẽ layout, quyết định block, viết MOM)_

## 2. Bảng thống kê

| # | Ngày | Người | Mục đích | % dùng được | Link log |
|---|---|---|---|---|---|
| 1 | 06/08 | B | Draw.io → HTML skeleton | | [log](logs/2026-08-06_B_drawio-to-html.md) |
| 2 | 08/08 | C | CSS flexbox cho site-header | | [log](logs/2026-08-08_C_flexbox-header.md) |
| 3 | | | | | |

> Mỗi người tối thiểu 2 log. Tổng tối thiểu 6 log.

## 3. Ba prompt hiệu quả nhất

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

## 4. Ba lần AI sai và cách nhóm xử lý

| # | AI sai gì | Nhóm phát hiện bằng cách nào | Đã sửa thế nào |
|---|---|---|---|
| 1 | | | |
| 2 | | | |
| 3 | | | |

## 5. Bài học rút ra

1. _(ví dụ: phải dán danh sách block vào CONTEXT, không thì AI tự chế block mới)_
2. _(ví dụ: AI hay dùng grid dù đã yêu cầu flexbox — cần nhắc lại trong CONSTRAINT)_
3. _(ví dụ: output dài thì AI bỏ qua ràng buộc ở cuối prompt, nên đặt CONSTRAINT trước FORMAT)_
4.
5.

---

## Nguyên tắc nhóm đã tuân thủ

- ✅ AI viết, người đọc hiểu và sửa — không copy-paste thẳng vào commit
- ✅ Log ngay sau khi dùng, không dồn tới cuối tuần
- ✅ API key để trong `.env`, không commit, không dán vào log
- ✅ Mọi prompt đều kèm danh sách block đã chốt
