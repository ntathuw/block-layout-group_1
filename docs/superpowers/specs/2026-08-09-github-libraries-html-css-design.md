# Spec: GitHub Libraries — HTML/CSS tĩnh

## 1. Mục tiêu

Xây dựng bản mô phỏng tĩnh của [GitHub Libraries](https://github.com/libraries#main-content) bằng HTML semantic và CSS thuần, có bố cục desktop và responsive mobile. Phạm vi triển khai chỉ gồm:

- `src/index.html`: nội dung và cấu trúc DOM.
- `src/css/style.css`: toàn bộ layout, typography, màu sắc, responsive và trạng thái focus.

## 2. Phạm vi và nguồn chuẩn

- Bám đúng cấu trúc và thứ tự trực quan trong `design/v2/drawio/Blocklayout-BEM-Github(v2).drawio`.
- Draw.io là nguồn ưu tiên khi có mâu thuẫn với `docs/block-list.md`.
- Chỉ bổ sung block `.pagination` từ `docs/block-list.md`; không thêm các block chỉ có trong `block-list.md` nhưng không có trong Draw.io, gồm `.sidebar-filter`.
- Dấu chấm đứng trước tên trong nhãn Draw.io chỉ là ký hiệu selector, không ghi vào thuộc tính HTML `class`. Ngoài quy ước đó, giữ nguyên tuyệt đối hoa thường, dấu gạch dưới, dấu gạch đôi và lỗi chính tả.
- Ký tự `|` hoặc khoảng trắng trang trí trong nhãn Draw.io không phải một phần của tên class; ví dụ dùng `popularrepo-card__heading` và `repo-card__badge`.

## 3. Hợp đồng class bắt buộc

Tất cả tên dưới đây phải xuất hiện ít nhất một lần trong DOM, không đổi tên hoặc chuẩn hóa. Có thể dùng lặp lại ở các card/nhánh responsive.

| Nhóm | Tên class phải giữ nguyên |
|---|---|
| Khung và layout | `header`, `site-header`, `left-side`, `center`, `right-side`, `main-layout` |
| Header | `site-header__hamburger`, `site-header__logo`, `site-header__heading`, `site-header__icon`, `site-header__search-bar`, `site-header__avatar` |
| Điều hướng | `sub-nav`, `sub-nav__nav2`, `sub-nav_nav1`, `sub-nav__nav3`, `sub-nav__nav4`, `sub-nav__nav5`, `sub-nav__hamburger` |
| Hồ sơ và tiêu đề | `Page-title`, `Profile-avatar`, `Profile-info`, `Profile-info__heading`, `Profile-info__meta`, `Profile-action`, `Profile-action__follow-btn` |
| Nội dung phổ biến | `popular-repos`, `popular-repos__title`, `popularrepo-card`, `popularrepo-card__heading`, `popularrepo-card__description`, `popularrepo-card__meta`, `popularrepo-card__badge` |
| Tìm kiếm và danh sách | `sub-heading`, `sub-heading__title`, `sub-heading__languages`, `search-bar`, `search-bar__icon`, `search-bar__input`, `search-bar__nav1`, `search-bar__nav2`, `search-bar__nav3`, `fitter-btn`, `repo-list`, `repo-card`, `repo-card__title`, `repo-card__header`, `repo-card__desc`, `repo-card__description`, `repo-card__meta`, `repo-card__badge` |
| Thông tin phụ và footer | `right-info`, `right-info_people`, `right-info__heading`, `right-info__description`, `right-info__meta`, `site-footer`, `site-footer__logo`, `site-footer__links`, `site-footer__copyright` |
| Block bổ sung | `pagination` |

`.pagination` là block mới duy nhất; không tạo thêm utility class, component class hoặc biến thể class ngoài danh sách trên.

## 4. Kiến trúc và thứ tự layout

### Desktop — từ 768px trở lên

- Toàn trang dùng semantic landmarks: `header` cho `.header`, `nav` cho `.sub-nav`, `main#main-content` cho nội dung, `aside` cho `.right-info`, `footer` cho `.site-footer`.
- `.site-header` nằm trước `.sub-nav`. Header hiển thị logo, heading, icon, tìm kiếm, avatar và hamburger theo đúng tên class Draw.io.
- Khu vực nội dung giữ thứ tự `.left-side`, `.center`, `.right-side`; phần nội dung chính trong `.center` đi theo thứ tự `.Page-title`, hồ sơ `.Profile-*`, `.popular-repos`, `.sub-heading`, `.search-bar`, `.main-layout` và `.repo-list`.
- `.main-layout` dùng Flexbox để đặt `.repo-list` cạnh `.right-info`, không dùng CSS Grid. Danh sách repo là vùng chính; sidebar là vùng phụ theo tỷ lệ thể hiện trong Draw.io.
- `.pagination` nằm sau `.repo-list`, căn giữa theo chiều ngang.
- Container nội dung có `max-width: 1200px`, gutter ngang `24px`, căn giữa viewport.
- Footer nằm sau toàn bộ nội dung; `.site-footer__logo`, `.site-footer__copyright`, `.site-footer__links` xếp thành các vùng ngang.

### Mobile — dưới 768px

- Chuyển toàn bộ bố cục sang một cột theo thứ tự đọc: header, điều hướng, tiêu đề/hồ sơ, nội dung phổ biến, tìm kiếm, repo list, pagination, footer.
- `.left-side`, `.center`, `.right-side` không được tạo chiều rộng cố định gây tràn; các vùng co về `width: 100%`.
- `.main-layout` đổi thành Flexbox một cột; `.right-info` nằm sau `.repo-list` trong thứ tự DOM và thứ tự đọc.
- Nav desktop được thu gọn bằng CSS/native HTML; dùng `details/summary` không cần JavaScript, với `.sub-nav__hamburger` trên phần tử `summary`.
- Giảm padding card và kích thước chữ hợp lý; `.pagination` vẫn căn giữa và rút gọn số trang hiển thị.
- Không đặt kích thước tối thiểu, margin âm hoặc phần tử tuyệt đối khiến trang rộng hơn viewport.

### Breakpoint kiểm tra

- Desktop: `>= 768px`, gồm 1200px và 768px.
- Mobile: `< 768px`, gồm 767px và 375px.

## 5. Nội dung tĩnh và tài nguyên

- Hiển thị tiêu đề trang Libraries, số lượng kết quả, nhãn tìm kiếm, các mục điều hướng, bộ lọc, danh sách repo mẫu, mô tả, ngôn ngữ, sao, thời điểm cập nhật, phân trang và liên kết footer.
- Dữ liệu repo, số trang và trạng thái lọc là hard-code trong HTML; không gọi API và không cần backend.
- Icon/logo dùng SVG inline. Ảnh avatar hoặc asset khác chỉ được tham chiếu bằng đường dẫn tương đối tới file cục bộ trong repository; khi không có asset phù hợp, dùng SVG inline hoặc chữ thay thế.
- Không dùng CDN, font ngoài, ảnh ngoài, `@import` từ network, iframe hoặc bất kỳ tài nguyên HTTP/HTTPS nào.
- Không dùng JavaScript, framework, package/dependency, build step hoặc dark mode.

## 6. Accessibility cơ bản

- Có một `h1` cho tiêu đề trang; heading con theo thứ tự hợp lý.
- Có `header`, `nav`, `main#main-content`, `aside`, `footer`; liên kết skip-to-content trỏ đúng `#main-content`.
- Mọi ô nhập có `label` hoặc accessible name; icon SVG trang trí có `aria-hidden="true"`, SVG mang thông tin có nhãn.
- Nút, link và điều khiển native có tên rõ ràng, thứ tự Tab hợp lý, vùng chạm đủ lớn và `:focus-visible` nhìn thấy rõ.
- Ảnh có `alt` phù hợp; nội dung không chỉ truyền đạt bằng màu sắc.

## 7. Exclusions

- Không triển khai tìm kiếm, lọc, phân trang hoặc follow động; hamburger không có toggle bằng JavaScript, chỉ được mở/đóng bằng native `details/summary`.
- Không kết nối GitHub API, không lấy dữ liệu runtime, không thêm route hoặc trang khác.
- Không đổi class theo kebab-case/BEM chuẩn; không thay Draw.io bằng tên trong `block-list.md` khi hai nguồn khác nhau.
- Không sửa Draw.io, `docs/block-list.md` hoặc bất kỳ file nào ngoài `src/index.html` và `src/css/style.css` trong phần triển khai website.

## 8. Verification

Người triển khai/reviewer kiểm tra:

1. Mở `src/index.html` trong trình duyệt và xác nhận file tải được chỉ với asset cục bộ.
2. Đối chiếu DOM với toàn bộ inventory ở mục 3; mỗi tên class phải có mặt đúng chính tả, kể cả `Page-title`, `fitter-btn`, `right-info_people` và `sub-nav_nav1`.
3. Quan sát tại viewport lần lượt `1200px`, `768px`, `767px` và `375px`; xác nhận chuyển layout đúng breakpoint.
4. Ở cả bốn viewport, xác nhận không có thanh cuộn ngang và nội dung không bị cắt.
5. Dùng Tab để đi qua link, form control và điều khiển native; xác nhận landmark, label, skip link và focus visible.
6. Mở Network/nguồn trang và xác nhận không có request tới tài nguyên ngoài; xác nhận không có script, framework hoặc dependency.
7. Chạy `git diff --check` và xác nhận không có whitespace error.

## 9. Acceptance checklist nhị phân

- [ ] File `src/index.html` tồn tại và chứa trang mô phỏng GitHub Libraries.
- [ ] File `src/css/style.css` tồn tại và được liên kết bằng đường dẫn tương đối.
- [ ] Tất cả class trong inventory Draw.io xuất hiện trong DOM, không đổi hoa thường, dấu `_`, `__` hoặc spelling.
- [ ] `.pagination` xuất hiện và là block bổ sung duy nhất từ `docs/block-list.md`.
- [ ] Cấu trúc/thứ tự desktop bám Draw.io; desktop dùng Flexbox, container tối đa 1200px và gutter 24px.
- [ ] Responsive quan sát đúng tại 1200px, 768px, 767px và 375px.
- [ ] Không có overflow ngang ở cả bốn kích thước.
- [ ] Có semantic landmarks, `#main-content`, nhãn form, alt text, keyboard focus và focus visible.
- [ ] SVG inline và asset cục bộ; không có tài nguyên ngoài/network request.
- [ ] Không có JavaScript, framework, dependency hoặc dark mode.
- [ ] Nội dung là tĩnh, gồm title, search/filter presentation, repo cards, metadata, pagination và footer links.
- [ ] `git diff --check` không báo lỗi.
