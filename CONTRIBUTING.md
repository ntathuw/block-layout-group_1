# Quy ước làm việc

## 1. Nhánh

Đặt tên theo mã ticket:

```
SET26-<số ticket>/<TênNgười>/<mô-tả-ngắn>
```

Ví dụ: `SET26-5/NguyenPhuc/Desktop-block-layout`

```
main   ← chỉ nhận merge qua PR, luôn chạy được
```

## 2. THỨ TỰ — luật bắt buộc

Đề bài chấm trực tiếp phần này: **bản vẽ phải đứng trước code.**

Áp dụng ở 2 chỗ:

### a. Thứ tự commit trong nhánh của mình

Không commit vào `src/` trước khi bản vẽ tương ứng đã được commit.

### b. Thứ tự merge vào `main` — quan trọng nhất

Leader merge theo đúng thứ tự dưới đây, không đảo:

```
1. docs:    block-list + naming convention
2. design:  bản vẽ tay (mobile + desktop)
3. design:  draw.io + PNG export
4. feat:    HTML/CSS                          ← code bắt đầu từ đây
   --- chỉ khi cần sửa layout ---
5. design:  bản vẽ v2  →  refactor: sửa code theo v2
6. docs:    AI history report + meeting minutes
```

Bản vẽ v2 phải merge **trước** commit sửa code theo v2.

**Kiểm tra trước khi nộp:**

```bash
git checkout main && git pull
git log --oneline --graph main
```

→ commit `design:` đầu tiên phải nằm **dưới** commit `feat:` đầu tiên trong log.

**Ba điều cấm:**

1. ❌ Merge nhánh code vào `main` khi nhánh design chưa merge.
2. ❌ Gộp ảnh vẽ tay chung một commit với code.
3. ❌ Chỉ commit PNG mà thiếu file `.drawio` gốc.

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