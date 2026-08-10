# GitHub Libraries Layout v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Đưa bản clone GitHub Libraries khớp bản gốc hơn (header gộp sub-nav, block right-info, footer căn giữa, dark theme) và thay bản vẽ v1 bằng v2.

**Architecture:** Sửa trực tiếp `src/index.html` và `src/css/style.css` (không build, không JS). Đổi tên nhánh class `sidebar-info*` → `right-info*` giữ nguyên hợp đồng class còn lại. Copy bản vẽ v2 đã đổi nhãn vào `design/v2/drawio/`, xóa `design/v1/`, cập nhật tài liệu tham chiếu.

**Tech Stack:** HTML thuần + CSS thuần. Không framework, không build, không test framework — kiểm tra bằng grep + mở trình duyệt.

## Global Constraints

- Tuyệt đối không đổi class ngoài nhánh `sidebar-info*` → `right-info*`; không thêm element BEM mới.
- Không dùng JavaScript, framework, tài nguyên/network ngoài, dark mode ngoài phạm vi (toàn trang là dark theme).
- Nguồn chuẩn: `design/v2/drawio/Blocklayout-BEM-Github(v2).drawio` sau khi đổi nhãn.
- Commit mọi task bằng `git add` rõ ràng; giữ style commit `<type>: <desc>`.
- Đích: mọi việc chạy trong repository `12-Build-the HTML-CSS-for-the-GitHub-website`, nhánh hiện tại, không tạo worktree.

---

### Task 1: Bản vẽ v2 — đổi nhãn class, copy vào repo, xóa v1

**Files:**
- Modify: `E:\SET-2026\Block-Github\block-layout-group_1\design\v1\drawio\Blocklayout-BEM-Github(v2).drawio` (file ngoài repo, sửa ngay tại nguồn rồi copy về)
- Create: `design/v2/drawio/Blocklayout-BEM-Github(v2).drawio`, `design/v2/drawio/Blocklayout-BEM-Github(V2).drawio.png`
- Delete: `design/v1/` (toàn bộ)

**Interfaces:**
- Produces: file drawio v2 có mọi nhãn `.right-info*`; là nguồn chuẩn cho Task 4.

- [ ] **Step 1: Đổi tên nhãn trong file drawio gốc**

Mở file bằng Read (đã đọc) rồi dùng Edit với `replaceAll`, `oldString: "sidebar-info"`, `newString: "right-info"`. Mọi biến thể `.sidebar-info`, `.sidebar-info_people`, `.sidebar-info__heading`, `.sidebar-info__description`, `.sidebar-info__meta` đều đổi tự động thành `.right-info*`.

Kiểm tra: `Select-String -Path "...\Blocklayout-BEM-Github(v2).drawio" -Pattern "sidebar-info"` → không có dòng trả về.

- [ ] **Step 2: Copy vào `design/v2/drawio/` và xóa `design/v1/`**

```powershell
New-Item -ItemType Directory -Force -Path "design\v2\drawio"
Copy-Item "E:\SET-2026\Block-Github\block-layout-group_1\design\v1\drawio\Blocklayout-BEM-Github(v2).drawio" "design\v2\drawio\"
Copy-Item "E:\SET-2026\Block-Github\block-layout-group_1\design\v1\drawio\Blocklayout-BEM-Github(V2).drawio.png" "design\v2\drawio\"
git rm -r design/v1
```

(chạy với `workdir` là thư mục repo)

- [ ] **Step 3: Verify + commit**

```powershell
Test-Path "design\v2\drawio\Blocklayout-BEM-Github(v2).drawio"
Test-Path "design\v2\drawio\Blocklayout-BEM-Github(V2).drawio.png"
Test-Path "design\v1"
git add design/v2
git commit -m "design: replace v1 with v2 (right-info naming)"
```

Expected: hai file `True`, `design/v1` `False`, commit thành công.

> Ghi chú: PNG là ảnh export tĩnh nên nhãn cũ có thể còn hiện trong ảnh; nhãn trong `.drawio` mới là nguồn chuẩn. Muốn PNG khớp hoàn toàn thì mở file trong draw.io.app và Export lại (thao tác thủ công, không bắt buộc).

---

### Task 2: HTML — gộp sub-nav vào header, block right-info, footer links

**Files:**
- Modify: `src/index.html`

**Interfaces:**
- Consumes: tên class hợp đồng từ spec (`.right-info`, `.right-info_people`, `.right-info__heading`, `.right-info__description`, `.right-info__meta`).
- Produces: DOM với `.sub-nav` trong `.header`; aside `.right-info` với People/Top languages/Report abuse; footer links mới.

- [ ] **Step 1: Chuyển `.sub-nav` vào trong `.header`**

Dùng Edit trên `src/index.html`. Cắt toàn bộ khối `<nav class="sub-nav" aria-label="Libraries navigation">…</nav>` (dòng 38–54) và dán vào ngay sau `</div>` đóng `.site-header` (dòng 36), trước `</header>` (dòng 37). Kết quả:

```html
  <header class="header">
    <div class="site-header">
      …(giữ nguyên nội dung site-header)…
    </div>
    <nav class="sub-nav" aria-label="Libraries navigation">
      <div>
        <a class="sub-nav_nav1" href="#popular">Popular</a>
        <a class="sub-nav__nav2" href="#repositories">Repositories</a>
        <a class="sub-nav__nav3" href="#languages">Languages</a>
        <a class="sub-nav__nav4" href="#people">People</a>
        <a class="sub-nav__nav5" href="#footer-links">About</a>
      </div>
      <details>
        <summary class="sub-nav__hamburger">Explore libraries</summary>
        <a class="sub-nav_nav1" href="#popular">Popular</a>
        <a class="sub-nav__nav2" href="#repositories">Repositories</a>
        <a class="sub-nav__nav3" href="#languages">Languages</a>
        <a class="sub-nav__nav4" href="#people">People</a>
        <a class="sub-nav__nav5" href="#footer-links">About</a>
      </details>
    </nav>
  </header>
```

- [ ] **Step 2: Thay aside `sidebar-info` bằng `right-info`**

Dùng Edit thay toàn bộ khối `<aside class="sidebar-info" …>…</aside>` (dòng 145–154) bằng:

```html
        <aside class="right-info" id="people" aria-labelledby="right-info-title">
          <div class="right-info_people" aria-hidden="true">
            <svg viewBox="0 0 16 16" width="20" height="20" aria-hidden="true">
              <path fill="currentColor" d="M5.5 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM0 13.5C0 10.46 2.46 8 5.5 8S11 10.46 11 13.5V15H0Zm11.8.5v-1c0-1.58-.56-3.03-1.5-4.16A4.5 4.5 0 0 1 16 13.2v.8Z"/>
            </svg>
          </div>
          <h2 class="right-info__heading" id="right-info-title">People</h2>
          <p class="right-info__description">Libraries are maintained by people and organizations building software in the open.</p>
          <p class="right-info__meta">Over 100 million developers contribute on GitHub.</p>
          <hr>
          <h2 class="right-info__heading">Top languages</h2>
          <ul>
            <li class="right-info__meta" style="--dot-color:#f1e05a">JavaScript</li>
            <li class="right-info__meta" style="--dot-color:#3178c6">TypeScript</li>
            <li class="right-info__meta" style="--dot-color:#3572A5">Python</li>
            <li class="right-info__meta" style="--dot-color:#f34b7d">C++</li>
          </ul>
          <a href="#report-abuse">Report abuse</a>
        </aside>
```

Giữ `id="people"` trên aside để link `#people` của sub-nav vẫn hoạt động.

- [ ] **Step 3: Bổ sung link footer**

Dùng Edit thêm vào cuối `.site-footer__links` (trước `</nav>`):

```html
      <a id="community" href="#community">Community</a>
      <a id="docs" href="#docs">Docs</a>
      <a id="contact" href="#contact">Contact</a>
      <a id="cookies" href="#cookies">Manage cookies</a>
      <a id="do-not-share" href="#do-not-share">Do not share my personal information</a>
```

- [ ] **Step 4: Verify + commit**

```powershell
git diff --check
Select-String -Path "src\index.html" -Pattern "sidebar-info"
```

Expected: `git diff --check` không báo lỗi; `sidebar-info` không còn xuất hiện.

```bash
git add src/index.html
git commit -m "feat: nest sub-nav in header, rename sidebar-info to right-info, add footer links"
```

---

### Task 3: CSS — dark theme, right-info, footer giữa, responsive

**Files:**
- Modify: `src/css/style.css`

**Interfaces:**
- Consumes: DOM class từ Task 2 (`.right-info*`), token dark theme.
- Produces: toàn bộ styling dark; `.right-info` phẳng; footer căn giữa.

- [ ] **Step 1: Thay token `:root` sang dark theme**

Dùng Edit thay khối `:root { … }` (dòng 1–20) bằng:

```css
:root {
  --canvas: #0d1117;
  --surface: #0d1117;
  --surface-muted: #161b22;
  --border: #30363d;
  --border-muted: #21262d;
  --text: #e6edf3;
  --muted: #8b949e;
  --link: #58a6ff;
  --link-hover: #79c0ff;
  --header: #161b22;
  --header-text: #ffffff;
  --success: #238636;
  --focus: #2f81f7;
  --radius: 6px;
  --shadow: 0 1px 0 rgba(1, 4, 9, 0.4);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  color: var(--text);
  background: var(--canvas);
}
```

- [ ] **Step 2: Sửa màu cứng trong header/button**

Edit từng chỗ:

- `button:hover { background: #eef1f4; }` → `background: #21262d;`
- `.site-header__hamburger` `border: 1px solid #57606a;` → `border: 1px solid #484f58;`
- `.site-header__search-bar { background: #2f343b; border-color: #57606a; }` → `background: #21262d; border-color: #484f58;`
- `.site-header__search-bar::placeholder { color: #c9d1d9; }` → `color: #8b949e;`
- `.Profile-action__follow-btn:hover { background: #1a7f37; }` → `background: #2ea043;`
- `.site-header__avatar` giữ nguyên (vòng avatar trắng), `.site-header label` giữ `#f0f6fc`.

- [ ] **Step 3: Thay style `.sidebar-info*` bằng `.right-info*`**

Dùng Edit:

- Nhóm selector `.popularrepo-card__meta,\n.repo-card__meta,\n.sidebar-info__meta` → đổi `sidebar-info__meta` thành `right-info__meta`.
- Thay khối `.sidebar-info { … }` (flex 28%, padding 20px, bg surface-muted, border, radius) và `.sidebar-info_people { … }`, `.sidebar-info__heading { … }`, `.sidebar-info__description { … }` bằng:

```css
.right-info {
  flex: 1 1 28%;
  min-width: 0;
  padding: 4px 0;
}

.right-info_people {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin-bottom: 12px;
  color: var(--link);
  background: rgba(56, 139, 253, 0.15);
  border-radius: 50%;
}

.right-info__heading {
  margin: 0 0 4px;
  font-size: 14px;
  font-weight: 600;
}

.right-info__description {
  margin: 0 0 8px;
  color: var(--muted);
  font-size: 12px;
  overflow-wrap: anywhere;
}

.right-info ul {
  margin: 0 0 8px;
  padding: 0;
  list-style: none;
}

.right-info ul .right-info__meta {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 2px 0;
}

.right-info ul .right-info__meta::before {
  width: 9px;
  height: 9px;
  flex: 0 0 auto;
  content: "";
  background: var(--dot-color, #8b949e);
  border-radius: 50%;
}

.right-info hr {
  margin: 12px 0;
  border: 0;
  border-top: 1px solid var(--border-muted);
}

.right-info a {
  color: var(--link);
  font-size: 12px;
}
```

- [ ] **Step 4: Footer căn giữa**

Edit `.site-footer { … }`: bỏ `justify-content: space-between`, đổi thành `justify-content: center; gap: 16px 24px;`.

- [ ] **Step 5: Cập nhật media queries tham chiếu `.sidebar-info`**

Edit ở `@media (max-width: 767px)`:
- `.main-layout > div, .repo-list, .sidebar-info { … }` → đổi `sidebar-info` thành `right-info`.
- `.repo-card, .sidebar-info, .popularrepo-card { … }` → đổi `sidebar-info` thành `right-info`.

- [ ] **Step 6: Verify + commit**

```powershell
git diff --check
Select-String -Path "src\css\style.css" -Pattern "sidebar-info"
Select-String -Path "src\css\style.css" -Pattern "#eef1f4|#57606a|#2f343b"
```

Expected: `git diff --check` sạch; `sidebar-info` và màu light cũ không còn trong CSS.

```bash
git add src/css/style.css
git commit -m "feat: apply dark theme, right-info and centered footer styles"
```

---

### Task 4: Tài liệu — README, block-list, spec/plan cũ

**Files:**
- Modify: `README.md`, `docs/block-list.md`, `docs/superpowers/specs/2026-08-09-github-libraries-html-css-design.md`, `docs/superpowers/plans/2026-08-09-github-libraries-html-css.md`

**Interfaces:**
- Consumes: tên class mới từ Task 1–3; đường dẫn `design/v2/drawio/`.

- [ ] **Step 1: Cập nhật `README.md`**

- Cấu trúc thư mục: thay nhánh `design/` thành:

```
├── design/
│   └── v2/
│       ├── hand/              # ảnh chụp bản vẽ tay
│       ├── drawio/            # file .drawio gốc + PNG export
│       └── CHANGELOG.md
```

- Bảng "Xem layout": v1 → `design/v2/hand/…` và `design/v2/drawio/Blocklayout-BEM-Github(v2).drawio`; bỏ dòng v2 "(nếu có)".

- [ ] **Step 2: Cập nhật `docs/block-list.md`**

Mở file, đổi mọi mục block `sidebar-info`, `sidebar-info_people`, `sidebar-info__heading`, `sidebar-info__description`, `sidebar-info__meta` thành tên `right-info*` tương ứng; sửa ghi chú nguồn nếu có.

- [ ] **Step 3: Cập nhật spec + plan HTML-CSS cũ**

Trong `docs/superpowers/specs/2026-08-09-github-libraries-html-css-design.md` và `docs/superpowers/plans/2026-08-09-github-libraries-html-css.md`:
- Đường dẫn Draw.io: `…\design\v1\drawio\Blocklayout-BEM-Github(v2).drawio` → `design/v2/drawio/Blocklayout-BEM-Github(v2).drawio`.
- Inventory class: mọi `sidebar-info*` → `right-info*` (gồm cả block `sidebar-info_people` → `right-info_people`).
- Cập nhật số lượng class trong các đoạn kiểm tra `approved = set(…)` và `len(approved)` nếu liệt kê class (không đổi số lượng vì chỉ đổi tên).

- [ ] **Step 4: Verify + commit**

```powershell
git diff --check
Select-String -Path "README.md","docs\block-list.md","docs\superpowers\specs\2026-08-09-github-libraries-html-css-design.md","docs\superpowers\plans\2026-08-09-github-libraries-html-css.md" -Pattern "sidebar-info"
```

Expected: không còn `sidebar-info` trong các file kể trên (v1/CHANGELOG ngoài repo không tính).

```bash
git add README.md docs/block-list.md docs/superpowers/specs/2026-08-09-github-libraries-html-css-design.md docs/superpowers/plans/2026-08-09-github-libraries-html-css.md
git commit -m "docs: reference design v2 and right-info naming"
```

---

### Task 5: Verification tổng

**Files:**
- Không sửa file; chỉ kiểm tra.

- [ ] **Step 1: Kiểm tra tĩnh**

```powershell
git status --short
git diff --check
Select-String -Recurse -Path "src" -Pattern "sidebar-info"
Test-Path "design\v2\drawio\Blocklayout-BEM-Github(v2).drawio"
Test-Path "design\v1"
```

Expected: `sidebar-info` không còn trong `src/`; v2 drawio `True`; `design/v1` `False`; git sạch sau các commit.

- [ ] **Step 2: Kiểm tra trình duyệt**

Mở `src/index.html` và kiểm tra tại 1200px, 768px, 767px, 375px:

1. `.sub-nav` nằm ngay dưới `.site-header` trong cùng vùng header (nền tối nối tiếp).
2. Cột phải không còn là card; hiển thị People, đường phân cách, Top languages (4 dòng có chấm màu), Report abuse.
3. Footer các nhóm nằm giữa, gần nhau có gap, đủ link mới; mobile xếp dọc.
4. Toàn trang dark theme, text đọc được, focus-visible rõ.
5. Không overflow ngang; link `#people` của sub-nav nhảy đúng aside.

- [ ] **Step 3: Kiểm tra không tài nguyên ngoài**

Mở DevTools → Network, xác nhận chỉ tải `index.html` và `style.css`, không có request ngoài, không script.
