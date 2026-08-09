# Spec: Buổi 16 - Block Layout và quy tắc BEM

## Mục tiêu

Tạo một tài liệu Markdown tiếng Việt tại `docs/buoi-16-block-layout-bem.md` để hệ thống hóa kiến thức về tư duy Block Layout và phương pháp đặt tên BEM, phục vụ việc học và triển khai HTML/CSS cho giao diện GitHub Library.

## Phạm vi

Tài liệu có tiêu đề `BUỔI 16: BLOCK LAYOUT VÀ QUY TẮC BEM` và gồm các phần:

- Vai trò của sơ đồ layout trước khi viết HTML/CSS.
- Quy trình phân tích block từ ngoài vào trong, từ trên xuống dưới và từ trái sang phải.
- Cách gom nhóm phần tử, phân biệt phần tĩnh/phần động, và xác định padding/margin.
- Khái niệm Block, Element và Modifier cùng cú pháp BEM Two Dashes Style.
- Quy tắc giữ cấu trúc BEM phẳng, tránh lồng Element nhiều cấp.
- Hai cách xử lý cấu trúc lồng: rút gọn tên hoặc tách Nested Block.
- Kỹ thuật Mix khi kết hợp một Block độc lập với Element của Block chứa.

## Quy ước

- Dùng Markdown chuẩn với heading, danh sách, bảng hoặc code fence khi cần.
- Dùng ví dụ class theo kebab-case và thống nhất với `docs/block-list.md`.
- Modifier dùng hai dấu gạch ngang: `block--modifier` hoặc `block__element--modifier`.
- Không thay đổi danh sách block hay quyết định layout trong `docs/block-list.md`.
- Không thêm dependency hoặc mã nguồn ứng dụng.

## Tiêu chí chấp nhận

- File `docs/buoi-16-block-layout-bem.md` tồn tại trong worktree mới.
- Nội dung bao quát đầy đủ các chủ đề và ví dụ đã được yêu cầu.
- Có ví dụ Mix tối thiểu với `button` và `card__button` trên cùng một thẻ HTML.
- Không có nội dung tạm thời hoặc phần chưa hoàn chỉnh.
- Markdown có thể đọc rõ ràng và không làm thay đổi các file dự án hiện có.

## Kiểm tra

- Kiểm tra file tồn tại và đọc lại nội dung.
- Tìm các marker dành cho phần việc chưa hoàn thành.
- Chạy `git diff --check` trong worktree.
