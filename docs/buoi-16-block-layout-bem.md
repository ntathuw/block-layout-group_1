# BUỔI 16: BLOCK LAYOUT VÀ QUY TẮC BEM

## Tư duy Layout và Sơ đồ khối (Block Layout)

### Tại sao cần dựng sơ đồ Layout trước khi viết code?

Việc làm website cũng tương tự như xây dựng một ngôi nhà, bạn không thể bắt tay vào thi công khi chưa có bản vẽ kỹ thuật. Trong quá trình phát triển web, HTML đóng vai trò dựng nên khung xương và cấu trúc không gian, còn CSS sẽ chịu trách nhiệm trang trí, phối màu và căn chỉnh.

Nếu bạn làm việc ngẫu hứng hoặc quá phụ thuộc vào các công cụ AI mà không quy hoạch khung khối trước, cấu trúc HTML rất dễ bị lộn xộn. Điều này dẫn đến nguy cơ vỡ giao diện khi cần chỉnh sửa, làm giao diện tương thích thiết bị (Responsive) hoặc bảo trì dự án sau này.

### Quy tắc phân tích và dựng sơ đồ Block Layout

Khi tiếp cận một giao diện, hãy luôn tuân thủ theo thứ tự phân tích:

- **Từ ngoài vào trong:** Xác định khung bao bọc (container) ngoài cùng trước, sau đó mới chia nhỏ các khối con bên trong.
- **Từ trên xuống dưới và từ trái sang phải:** Phân chia cấu trúc theo chiều dọc và chiều ngang của trang.

Một số lưu ý quan trọng khi xác định khối:

- **Gom nhóm chuẩn xác:** Các phần tử nằm cùng hàng hoặc có mối liên quan hiển thị với nhau (ví dụ: khi dùng Flexbox) bắt buộc phải nằm chung trong một khối cha.
- **Phân biệt phần tĩnh và phần động:** Với các danh sách lặp lại như danh sách video, bài viết hay bình luận, bạn chỉ cần phân tích cấu trúc chuẩn cho một phần tử đại diện.
- **Tính toán khoảng cách (Padding & Margin):** Việc phân chia khối rõ ràng giúp bạn xác định đúng vị trí đặt padding và margin, tránh tình trạng giao diện bị tràn hoặc lệch bố cục.

## Phương pháp đặt tên BEM (Block - Element - Modifier)

### Tại sao nên chọn BEM?

Đặt tên class trùng lặp hoặc không có quy chuẩn là nguyên nhân hàng đầu gây xung đột CSS trong dự án. BEM giúp tên class có ý nghĩa rõ ràng, dễ đọc, thuận tiện cho việc bảo trì và làm việc nhóm.

Hiện nay, chuẩn cú pháp phổ biến là Two Dashes Style (sử dụng hai dấu gạch ngang `--` cho Modifier) để tránh các cảnh báo lỗi trong HTML.

Cấu trúc các thành phần trong BEM:

### Block (Khối độc lập)

Là thành phần có ý nghĩa riêng, hoạt động độc lập và có thể tái sử dụng ở nhiều vị trí mà không phụ thuộc vào không gian xung quanh.

```text
Cú pháp:  block-name
Ví dụ:    .header, .card, .button, .comment-box
```

### Element (Phần tử con)

Là thành phần nằm bên trong Block, đóng vai trò bổ trợ và không thể đứng độc lập một mình.

```text
Cú pháp:  block-name__element-name  (sử dụng 2 dấu gạch dưới)
Ví dụ:    .card__title, .card__image, .card__button
```

### Modifier (Biến thể / Trạng thái)

Dùng để đánh dấu sự thay đổi về kiểu dáng, trạng thái hoặc hành vi của Block hoặc Element.

```text
Cú pháp:  block-name--modifier-name
          hoặc block-name__element-name--modifier-name
          (sử dụng 2 dấu gạch ngang)
Ví dụ:    .button--active, .button--disabled, .card__title--highlight
```

## Quy tắc lồng khối trong BEM (Tránh Anti-pattern)

Bạn cần tránh lồng tên quá sâu và ưu tiên giữ cấu trúc phẳng. Tuyệt đối không viết class dạng `.block__element1__element2` (ví dụ: `.card__header__title`) vì BEM không cho phép một Element làm con của một Element khác.

Để xử lý trường hợp này, bạn có thể áp dụng 2 cách:

### Giải pháp 1 - Rút gọn tên (Phổ biến)

Giữ mối quan hệ phẳng với Block gốc. Nếu thành phần con không có ý nghĩa khi đứng riêng lẻ, hãy gắn trực tiếp nó vào Block bất chấp vị trí trong cây DOM (ví dụ: chuyển `.card__header__title` thành `.card__title`).

### Giải pháp 2 - Tách Block mới (Nested Block)

Chỉ tạo một Block mới khi thành phần đó đủ phức tạp, có ý nghĩa độc lập và có khả năng tái sử dụng ở nơi khác (ví dụ: dùng lại Block `.button` trong `.card` thay vì tạo `.card__header__button`).

## Kỹ thuật Mix (Kết hợp Class) nâng cao

Khi lồng một Block độc lập như `.button` vào trong `.card`, bạn không nên viết trực tiếp các thuộc tính căn chỉnh vị trí (như `margin`, `position`...) vào class `.button` vì sẽ làm hỏng bố cục của nút khi tái sử dụng ở nơi khác.

Giải pháp là kết hợp đồng thời class của Element và Block trên cùng một thẻ HTML:

```html
<button class="button card__button">Xem repository</button>
```

Trong đó, class `.card__button` sẽ đảm nhận việc điều khiển khoảng cách/vị trí của nút bên trong thẻ card, còn class `.button` sẽ giữ nguyên giao diện cốt lõi vốn có của nút.
