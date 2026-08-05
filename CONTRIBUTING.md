# Quy ước làm việc

## 1. Nhánh

```
main            ← chỉ nhận merge qua PR, luôn chạy được
 ├── design     ← bản vẽ (Designer)
 ├── code       ← HTML/CSS (Dev)
 └── ai-history ← log AI (ai cũng push được)
```

## 2. THỨ TỰ COMMIT — luật bắt buộc

Đề bài chấm trực tiếp phần này. Thứ tự đúng:

```
1. chore: init repo structure
2. docs: define block list and naming convention
3. design: add hand-drawn block layout v1 (mobile + desktop)   ← ẢNH VẼ TAY
4. design: add draw.io block layout v1 + png export            ← DRAW.IO
   >>> git tag design-v1 <<<
5. feat: add html skeleton following block layout v1           ← CODE BẮT ĐẦU TỪ ĐÂY
6. feat: add css reset and design tokens
7. feat: add desktop styles
8. feat: add mobile responsive styles
   --- chỉ khi cần sửa layout ---
9.  design: add hand-drawn layout v2 (<lý do>)
10. design: add draw.io layout v2 + png export
    >>> git tag design-v2 <<<
11. refactor: update layout to match design v2
12. docs: AI history report
13. docs: meeting minutes
    >>> git tag final <<<
```

**Ba điều cấm:**

1. ❌ Commit vào `src/` khi tag `design-v1` chưa tồn tại.
2. ❌ Gộp ảnh vẽ tay chung một commit với code.
3. ❌ Chỉ commit PNG mà thiếu file `.drawio` gốc.

**Trước khi code, Dev chạy:**

```bash
git checkout main && git pull
git log --oneline --decorate | grep design-v1   # phải thấy tag
```

Không thấy → chưa được code.

## 3. Commit message

```
<type>: <mô tả ngắn, tiếng Anh, thì hiện tại>
```

| type | dùng khi |
|---|---|
| `design` | thêm/sửa bản vẽ |
| `feat` | thêm HTML/CSS mới |
| `fix` | sửa lỗi |
| `refactor` | sửa code không đổi hành vi |
| `docs` | README, MOM, AI history |
| `chore` | cấu hình, cấu trúc thư mục |

✅ Tốt: `design: add draw.io mobile layout v1` · `feat: add repo-card block css`
❌ Xấu: `update` · `fix bug` · `commit lan 3`

## 4. Danh tính Git

Mỗi người chạy 1 lần trong repo, để tab Contributors hiện đủ 3 người:

```bash
git config user.name "Họ Tên"
git config user.email "email-github@example.com"
```

Kiểm tra: `git log --format='%an <%ae>' | sort -u`

## 5. Bảo mật

- API key DeepSeek để trong `.env` (đã bị `.gitignore` chặn). Kiểm: `git check-ignore -v .env`
- Không dán key vào chat nhóm, không dán vào file log AI.
- Nếu lỡ commit key → báo leader ngay, revoke key, không tự ý rewrite history.

## 6. Pull Request

- Mọi thay đổi vào `main` đi qua PR.
- Leader là người merge, dùng `--no-ff` để giữ dấu vết nhánh.
- Người tạo PR ghi rõ: làm gì, ảnh hưởng block nào, có cần cập nhật `block-list.md` không.
