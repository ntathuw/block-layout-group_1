# GitHub Libraries HTML/CSS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây dựng bản mô phỏng tĩnh GitHub Libraries bằng `src/index.html` semantic và `src/css/style.css` thuần, khớp Draw.io v1 ở desktop và responsive mobile.

**Architecture:** HTML chỉ chứa một trang tĩnh với landmark semantic, DOM theo thứ tự Draw.io và toàn bộ class contract đã duyệt. CSS mobile-first ở mức reset/base, bổ sung desktop từ `768px` và mobile tại `max-width: 767px`; Flexbox là kỹ thuật layout duy nhất. Điều hướng mobile dùng native `details/summary`, không có JavaScript.

**Tech Stack:** HTML5 semantic, CSS3 thuần, inline SVG, Python standard library cho kiểm tra tĩnh, PowerShell cho lệnh kiểm tra repository.

## Global Constraints

- Chỉ tạo/sửa `src/index.html` và `src/css/style.css` trong phần triển khai website; kế hoạch này chỉ được ghi vào `docs/superpowers/plans/2026-08-09-github-libraries-html-css.md`.
- Phải xác nhận tag `design-v1` tồn tại trước mọi thay đổi trong `src/`; nếu thiếu thì dừng với blocker, không triển khai.
- Desktop là `>= 768px`, gồm `1200px` và `768px`; mobile là `< 768px`, gồm `767px` và `375px`.
- Container nội dung có `max-width: 1200px` và gutter ngang `24px`.
- Dùng Flexbox; không dùng CSS Grid, JavaScript, framework, package/dependency, build step, dark mode, CDN, font ngoài, iframe, `@import` network hoặc URL HTTP/HTTPS.
- Icon/logo dùng inline SVG; avatar hoặc asset khác chỉ dùng đường dẫn tương đối tới file cục bộ, hoặc thay bằng inline SVG/chữ.
- Không thêm utility class, component class, modifier class hoặc block nào ngoài 60 class từ Draw.io và `.pagination` là block bổ sung duy nhất.
- Không triển khai tìm kiếm, lọc, phân trang hoặc follow động; dữ liệu hiển thị hard-code trong HTML.
- Không commit trong quá trình thực hiện kế hoạch này.

---

### Task 1: `src/index.html` semantic DOM và exact class inventory

**Files:**
- Create: `src/index.html`
- Read-only prerequisite: `CONTRIBUTING.md`, `docs/superpowers/specs/2026-08-09-github-libraries-html-css-design.md`, `E:\SET-2026\Block-Github\block-layout-group_1\design\v1\drawio\Blocklayout-BEM-Github(v2).drawio`

**Interfaces:**
- Consumes: Draw.io v1 hierarchy, approved spec sections 2–7, and the `design-v1` tag gate from `CONTRIBUTING.md`.
- Produces: `src/index.html` linking only to `css/style.css`; DOM nodes whose class tokens are exactly the 61 approved names below; native navigation contract `details > summary.sub-nav__hamburger`.

- [ ] **Step 1: Run the mandatory `design-v1` gate before touching `src/`.**

  Run in PowerShell from the repository root:

  ```powershell
  $tag = git tag --list design-v1
  $logHit = git log --oneline --decorate | Select-String -Pattern 'design-v1'
  if ($tag -ne 'design-v1' -or -not $logHit) { Write-Output 'BLOCKER: design-v1 missing; stop before implementation'; exit 1 }
  Write-Output 'OK: design-v1 exists; implementation may proceed'
  $logHit
  ```

  Expected when the gate passes:

  ```text
  OK: design-v1 exists; implementation may proceed
  ```

  The following command must also print at least one actual decorated repository log line containing the literal text `design-v1`.

  Expected when the gate fails: `BLOCKER: design-v1 missing; stop before implementation`, followed by immediate stop. Do not create or modify `src/index.html` or `src/css/style.css` after that output.

- [ ] **Step 2: Create the semantic DOM in the exact reading order.**

  Use this hierarchy as the implementation contract; do not paste a full production HTML document into this plan:

  1. `body` starts with an unclassed skip link whose `href` is exactly `#main-content`.
  2. `<header class="header">` contains `<div class="site-header">`. Inside `.site-header`, place `.site-header__hamburger`, `.site-header__logo`, `.site-header__heading`, `.site-header__icon`, `.site-header__search-bar`, and `.site-header__avatar` in the Draw.io visual order. The decorative hamburger/icon/logo SVGs must be inline; decorative SVGs use `aria-hidden="true"`.
  3. `<nav class="sub-nav">` follows the header. It contains `<details open>` with `<summary class="sub-nav__hamburger">` as the native mobile control, followed by five clearly named navigation links carrying `.sub-nav_nav1`, `.sub-nav__nav2`, `.sub-nav__nav3`, `.sub-nav__nav4`, and `.sub-nav__nav5`. The exact typo in `.sub-nav_nav1` is intentional.
  4. `<main id="main-content">` has direct structural children in this order: `.left-side`, `.center`, `.right-side`. The side wrappers are layout gutters only and must not introduce another class.
  5. `.center` contains, in order: `.Page-title`; one profile section with `.Profile-avatar`, `.Profile-info` containing `.Profile-info__heading` and `.Profile-info__meta`, and `.Profile-action` containing `.Profile-action__follow-btn`; `.popular-repos`; `.sub-heading`; `.search-bar`; `.main-layout`; and `.pagination`.
  6. `.popular-repos` contains `.popular-repos__title` and one or more `.popularrepo-card` elements. Each card exposes `.popularrepo-card__heading`, `.popularrepo-card__description`, `.popularrepo-card__meta`, and `.popularrepo-card__badge` without renaming `popularrepo`.
  7. `.sub-heading` contains `.sub-heading__title` and `.sub-heading__languages`. The following `.search-bar` is a static search/filter presentation: its icon uses `.search-bar__icon`, its labeled input uses `.search-bar__input`, and its three navigation/filter controls use `.search-bar__nav1`, `.search-bar__nav2`, and `.search-bar__nav3`; the filter control uses the exact spelling `.fitter-btn`.
  8. `.main-layout` contains `.repo-list` before `<aside class="sidebar-info">`. Each `.repo-card` contains `.repo-card__header`, `.repo-card__title`, one of the exact description contracts `.repo-card__desc` or `.repo-card__description`, `.repo-card__meta`, and `.repo-card__badge`. The aside exposes `.sidebar-info_people`, `.sidebar-info__heading`, `.sidebar-info__description`, and `.sidebar-info__meta`.
  9. `.pagination` follows `.main-layout` and contains named static page controls. On desktop it can show previous, pages 1–5, and next; mobile CSS may hide the middle numeric links without JavaScript.
  10. `<footer class="site-footer">` follows all main content and contains the three horizontal regions `.site-footer__logo`, `.site-footer__copyright`, and `.site-footer__links`. Footer links use local fragment targets only.

  Content requirements: include the Libraries title and result count, search label, navigation labels, filter presentation, representative repository names/descriptions/languages/stars/update times, page controls, and footer links. Use one `h1` for the page title, sensible descendant headings, `alt` text for any real image, explicit `<label>` or an accessible name for every input, and a non-color-only meaning for badges/metadata.

  The exact approved class inventory is:

  | Group | Exact class tokens |
  |---|---|
  | Frame/layout | `header`, `site-header`, `left-side`, `center`, `right-side`, `main-layout` |
  | Header | `site-header__hamburger`, `site-header__logo`, `site-header__heading`, `site-header__icon`, `site-header__search-bar`, `site-header__avatar` |
  | Navigation | `sub-nav`, `sub-nav__nav2`, `sub-nav_nav1`, `sub-nav__nav3`, `sub-nav__nav4`, `sub-nav__nav5`, `sub-nav__hamburger` |
  | Profile/title | `Page-title`, `Profile-avatar`, `Profile-info`, `Profile-info__heading`, `Profile-info__meta`, `Profile-action`, `Profile-action__follow-btn` |
  | Popular content | `popular-repos`, `popular-repos__title`, `popularrepo-card`, `popularrepo-card__heading`, `popularrepo-card__description`, `popularrepo-card__meta`, `popularrepo-card__badge` |
  | Search/list | `sub-heading`, `sub-heading__title`, `sub-heading__languages`, `search-bar`, `search-bar__icon`, `search-bar__input`, `search-bar__nav1`, `search-bar__nav2`, `search-bar__nav3`, `fitter-btn`, `repo-list`, `repo-card`, `repo-card__title`, `repo-card__header`, `repo-card__desc`, `repo-card__description`, `repo-card__meta`, `repo-card__badge` |
  | Aside/footer | `sidebar-info`, `sidebar-info_people`, `sidebar-info__heading`, `sidebar-info__description`, `sidebar-info__meta`, `site-footer`, `site-footer__logo`, `site-footer__links`, `site-footer__copyright` |
  | Approved addition | `pagination` |

- [ ] **Step 3: Verify the HTML contract with Python standard library before starting CSS.**

  Run in PowerShell from the repository root:

  ```powershell
  @'
  from html.parser import HTMLParser
  from pathlib import Path
  import sys

  approved = set("""header site-header left-side center right-side main-layout
  site-header__hamburger site-header__logo site-header__heading site-header__icon site-header__search-bar site-header__avatar
  sub-nav sub-nav__nav2 sub-nav_nav1 sub-nav__nav3 sub-nav__nav4 sub-nav__nav5 sub-nav__hamburger
  Page-title Profile-avatar Profile-info Profile-info__heading Profile-info__meta Profile-action Profile-action__follow-btn
  popular-repos popular-repos__title popularrepo-card popularrepo-card__heading popularrepo-card__description popularrepo-card__meta popularrepo-card__badge
  sub-heading sub-heading__title sub-heading__languages search-bar search-bar__icon search-bar__input search-bar__nav1 search-bar__nav2 search-bar__nav3 fitter-btn repo-list repo-card repo-card__title repo-card__header repo-card__desc repo-card__description repo-card__meta repo-card__badge
  sidebar-info sidebar-info_people sidebar-info__heading sidebar-info__description sidebar-info__meta site-footer site-footer__logo site-footer__links site-footer__copyright pagination""".split())

  class Check(HTMLParser):
      def __init__(self):
          super().__init__()
          self.classes = set()
          self.tags = set()
          self.h1 = 0
          self.skip = False
          self.details = 0
          self.summary = 0
          self.controls = []
          self.labels = set()
          self.external = []
          self.scripts = 0
      def handle_starttag(self, tag, attrs):
          data = dict(attrs)
          self.tags.add(tag)
          self.classes.update(data.get('class', '').split())
          self.h1 += tag == 'h1'
          self.details += tag == 'details'
          self.summary += tag == 'summary'
          self.scripts += tag == 'script'
          if tag == 'a' and data.get('href') == '#main-content':
              self.skip = True
          if tag == 'label' and data.get('for'):
              self.labels.add(data['for'])
          if tag in {'input', 'textarea', 'select'}:
              self.controls.append(data)
          for value in data.values():
              if isinstance(value, str) and value.startswith(('http://', 'https://', '//')):
                  self.external.append(value)

  html = Path('src/index.html').read_text(encoding='utf-8')
  check = Check()
  check.feed(html)
  missing = approved - check.classes
  extra = check.classes - approved
  named = all(control.get('aria-label') or control.get('id') in check.labels for control in check.controls)
  required_tags = {'header', 'nav', 'main', 'aside', 'footer'} <= check.tags
  if len(approved) != 61 or missing or extra or check.h1 != 1 or not required_tags or not check.skip or check.details != 1 or check.summary != 1 or not named or check.scripts or check.external:
      print(f'FAIL: missing={sorted(missing)} extra={sorted(extra)} h1={check.h1} landmarks={required_tags} skip={check.skip} details={check.details} summary={check.summary} labeled={named} scripts={check.scripts} external={check.external}')
      sys.exit(1)
  print('PASS: HTML class inventory=61; landmarks/h1/skip/details/labels/static-resource checks passed.')
  '@ | python -
  ```

  Expected output: `PASS: HTML class inventory=61; landmarks/h1/skip/details/labels/static-resource checks passed.`. Any `FAIL:` output is a blocker for Task 2 and must be corrected in `src/index.html`.

### Task 2: `src/css/style.css` base + desktop

**Files:**
- Create: `src/css/style.css`
- Modify: none other than the stylesheet link already required in `src/index.html`

**Interfaces:**
- Consumes: the exact class tokens and DOM relationships produced by Task 1.
- Produces: base reset/design tokens and desktop layout at `@media (min-width: 768px)`, with no selectors depending on an unapproved class.

- [ ] **Step 1: Add the base contract without adding markup assumptions.**

  Implement a small reset (`box-sizing`, body margin, responsive media, inherited typography), CSS custom properties for the static palette/spacing, readable link/button/input defaults, and card/border/badge treatments. Keep all decorative SVG sizing on `svg`/approved selectors. Use `min-width: 0` on flex children and `overflow-wrap: anywhere` for repository names/descriptions so long content cannot widen the viewport. Do not use `@import`, external fonts, network URLs, `position: absolute`, negative margins, CSS Grid, dark-mode selectors, or a new class name.

- [ ] **Step 2: Add desktop selectors and preserve the exact DOM order.**

  Apply these selector contracts at `min-width: 768px`:

  - `.header` spans the viewport; `.site-header` is a horizontal Flexbox row containing the header controls, with `.site-header__search-bar` flexible and `.site-header__avatar` at the trailing edge.
  - `.sub-nav` is a horizontal navigation row. `.sub-nav__hamburger` remains available as the summary control but is visually secondary on desktop; links using all five navigation classes remain visible and named.
  - `main#main-content` is centered with `max-width: 1200px` and `padding-inline: 24px`; its direct `.left-side`, `.center`, `.right-side` children remain in that order. `.center` is the flexible content region; side wrappers have no fixed width that can force overflow.
  - `.Page-title`, the profile elements, `.popular-repos`, `.sub-heading`, and `.search-bar` occupy the center column in DOM order. The profile row uses Flexbox for avatar, info, and action; `.Profile-info` can grow while `.Profile-action__follow-btn` remains a clearly named control.
  - `.main-layout` is a horizontal Flexbox row. `.repo-list` is the primary flexible region, `.sidebar-info` is the secondary region at the Draw.io-like smaller proportion, and both have `min-width: 0`. Never replace this with Grid.
  - `.repo-card` is a vertical card; `.repo-card__header` aligns title and badge without absolute positioning. `.popularrepo-card` follows the same readable heading/description/meta/badge relationship.
  - `.pagination` is a block after `.main-layout`, centered horizontally. `.site-footer` follows main content and its `.site-footer__logo`, `.site-footer__copyright`, and `.site-footer__links` form three horizontal regions.

- [ ] **Step 3: Verify the base/desktop stylesheet is static Flexbox CSS.**

  Run in PowerShell from the repository root:

  ```powershell
  @'
  from pathlib import Path
  import re, sys
  css = Path('src/css/style.css').read_text(encoding='utf-8')
  forbidden = {
      'grid': re.search(r'display\s*:\s*grid|grid-template|grid-area', css, re.I),
      'network': re.search(r'@import|https?://|url\s*\(', css, re.I),
      'absolute': re.search(r'position\s*:\s*absolute', css, re.I),
      'dark-mode': re.search(r'prefers-color-scheme|color-scheme', css, re.I),
  }
  has_flex = bool(re.search(r'display\s*:\s*flex', css, re.I))
  if forbidden['grid'] or forbidden['network'] or forbidden['absolute'] or forbidden['dark-mode'] or not has_flex:
      print(f'FAIL: forbidden CSS={sorted(name for name, match in forbidden.items() if match)} flex={has_flex}')
      sys.exit(1)
  print('PASS: base/desktop CSS uses Flexbox only; no Grid, network import, absolute layout, or dark mode.')
  '@ | python -
  ```

  Expected output: `PASS: base/desktop CSS uses Flexbox only; no Grid, network import, absolute layout, or dark mode.`.

### Task 3: mobile `<= 767px` + focus/accessibility

**Files:**
- Modify: `src/css/style.css`
- Read-only contract: `src/index.html` from Task 1

**Interfaces:**
- Consumes: `.sub-nav` with native `<details open><summary class="sub-nav__hamburger">`, `.main-layout` with `.repo-list` before `.sidebar-info`, and the labeled/semantic controls from Task 1.
- Produces: `@media (max-width: 767px)` rules for 767px and 375px, visible keyboard focus, usable native disclosure behavior, and a one-column reading flow without changing any approved class token.

- [ ] **Step 1: Add the mobile one-column contract at `max-width: 767px`.**

  Set `.left-side`, `.center`, and `.right-side` to `width: 100%` with flexible sizing and no fixed minimum. Set `.main-layout` to `flex-direction: column`; keep `.repo-list` before `.sidebar-info` in both DOM and visual order, with each at `width: 100%`. Reduce card padding and type sizes only enough to preserve readable text. Keep `.pagination` centered and hide only the middle numeric links using structural selectors so previous/first/last/next remain available; do not add a pagination modifier class.

  Keep every box within the viewport through `box-sizing`, `max-width: 100%`, `min-width: 0`, wrapping, and flexible gaps. Do not use a minimum width, negative margin, absolute positioning, or a layout rule that depends on viewport overflow.

- [ ] **Step 2: Implement native navigation collapse and visible focus.**

  Show `.sub-nav__hamburger` as the mobile `summary` control; let the browser open/close the existing `<details>` element. Do not add JavaScript or a fake toggle. Keep summary/link/button/input hit areas usable. Define a shared `:focus-visible` contract for links, buttons, `summary`, and the search input with a high-contrast outline and offset that is visible against both card and header backgrounds. Preserve the native focus order; do not remove outlines globally.

- [ ] **Step 3: Verify mobile and accessibility selectors statically.**

  Run in PowerShell from the repository root:

  ```powershell
  @'
  from pathlib import Path
  import re, sys
  css = Path('src/css/style.css').read_text(encoding='utf-8')
  required = [
      r'@media\s*\(max-width\s*:\s*767px\)',
      r'\.main-layout\s*\{[^}]*flex-direction\s*:\s*column',
      r'\.left-side[^}]*width\s*:\s*100%',
      r'\.center[^}]*width\s*:\s*100%',
      r'\.right-side[^}]*width\s*:\s*100%',
      r':focus-visible',
  ]
  missing = [pattern for pattern in required if not re.search(pattern, css, re.I | re.S)]
  if missing:
      print(f'FAIL: missing mobile/accessibility selectors={missing}')
      sys.exit(1)
  print('PASS: mobile <=767px and :focus-visible contracts are present.')
  '@ | python -
  ```

  Expected output: `PASS: mobile <=767px and :focus-visible contracts are present.`. The visual overflow and keyboard behavior are verified in Task 4 at both mobile viewports.

### Task 4: final verification

**Files:**
- Verify only: `src/index.html`, `src/css/style.css`
- No file changes, commit, dependency installation, build, or test framework.

**Interfaces:**
- Consumes: the two implementation files and the approved checklist below.
- Produces: binary verification evidence only; any failed item remains an explicit blocker and is not reported as complete.

- [ ] **Step 1: Open the local page without a server or external resource.**

  Run in PowerShell from the repository root:

  ```powershell
  Start-Process (Resolve-Path 'src/index.html')
  ```

  Expected result: the browser opens the local file; the page renders without requiring a server, package, API, CDN, font, iframe, or HTTP/HTTPS request.

- [ ] **Step 2: Inspect the four required viewports and keyboard path.**

  In browser responsive tools, inspect exactly `1200px`, `768px`, `767px`, and `375px`. At each size, mark every applicable item below as pass/fail:

  - Desktop `1200px`: centered max-width container, 24px gutters, horizontal header/nav/footer, `.repo-list` beside `.sidebar-info`, centered `.pagination`.
  - Desktop `768px`: same desktop mode; no accidental mobile collapse before the breakpoint.
  - Mobile `767px`: one column, `.repo-list` before `.sidebar-info`, native `details/summary` navigation, centered reduced pagination.
  - Mobile `375px`: same one-column rules with wrapped repository text and usable controls.
  - All four sizes: no horizontal scrollbar, clipped content, fixed-width side region, negative-margin spill, or viewport overflow.
  - Press Tab through skip link, navigation links, search input, filter controls, follow control, pagination, and footer links; confirm every stop has a visible `:focus-visible` indicator and a clear accessible name.
  - Activate the skip link and confirm focus/reading position reaches `main#main-content`.
  - Open and close the native nav disclosure through `summary`; confirm no JavaScript is required.
  - Confirm exactly one `h1`, landmarks `header`, `nav`, `main#main-content`, `aside`, and `footer`, labels/accessible names for all inputs, suitable `alt` text, and `aria-hidden="true"` on decorative inline SVGs.

- [ ] **Step 3: Run the final Python standard-library resource and structure check.**

  Run in PowerShell from the repository root:

  ```powershell
  @'
  from html.parser import HTMLParser
  from pathlib import Path
  import re, sys

  approved = set("""header site-header left-side center right-side main-layout
  site-header__hamburger site-header__logo site-header__heading site-header__icon site-header__search-bar site-header__avatar
  sub-nav sub-nav__nav2 sub-nav_nav1 sub-nav__nav3 sub-nav__nav4 sub-nav__nav5 sub-nav__hamburger
  Page-title Profile-avatar Profile-info Profile-info__heading Profile-info__meta Profile-action Profile-action__follow-btn
  popular-repos popular-repos__title popularrepo-card popularrepo-card__heading popularrepo-card__description popularrepo-card__meta popularrepo-card__badge
  sub-heading sub-heading__title sub-heading__languages search-bar search-bar__icon search-bar__input search-bar__nav1 search-bar__nav2 search-bar__nav3 fitter-btn repo-list repo-card repo-card__title repo-card__header repo-card__desc repo-card__description repo-card__meta repo-card__badge
  sidebar-info sidebar-info_people sidebar-info__heading sidebar-info__description sidebar-info__meta site-footer site-footer__logo site-footer__links site-footer__copyright pagination""".split())

  class Check(HTMLParser):
      def __init__(self):
          super().__init__()
          self.classes, self.tags, self.external = set(), set(), []
          self.h1 = self.details = self.summary = self.scripts = 0
          self.skip = False
          self.svg_without_name = 0
      def handle_starttag(self, tag, attrs):
          data = dict(attrs)
          self.tags.add(tag)
          self.classes.update(data.get('class', '').split())
          self.h1 += tag == 'h1'
          self.details += tag == 'details'
          self.summary += tag == 'summary'
          self.scripts += tag == 'script'
          self.skip |= tag == 'a' and data.get('href') == '#main-content'
          if tag == 'svg' and data.get('aria-hidden') != 'true' and not data.get('aria-label') and not data.get('role'):
              self.svg_without_name += 1
          for value in data.values():
              if isinstance(value, str) and value.startswith(('http://', 'https://', '//')):
                  self.external.append(value)

  html = Path('src/index.html').read_text(encoding='utf-8')
  css = Path('src/css/style.css').read_text(encoding='utf-8')
  check = Check(); check.feed(html)
  missing = approved - check.classes
  extra = check.classes - approved
  forbidden_css = re.findall(r'@import|https?://|display\s*:\s*grid|grid-template|position\s*:\s*absolute|prefers-color-scheme|color-scheme', css, re.I)
  if len(approved) != 61 or missing or extra or check.h1 != 1 or not {'header', 'nav', 'main', 'aside', 'footer'} <= check.tags or not check.skip or check.details != 1 or check.summary != 1 or check.scripts or check.external or check.svg_without_name or forbidden_css:
      print(f'FAIL: missing={sorted(missing)} extra={sorted(extra)} h1={check.h1} tags={sorted(check.tags)} skip={check.skip} details={check.details} summary={check.summary} scripts={check.scripts} external={check.external} unnamed_svg={check.svg_without_name} forbidden_css={forbidden_css}')
      sys.exit(1)
  print('PASS: 61 classes, semantic/accessibility structure, local resources, and no-JS/no-Grid CSS checks passed.')
  '@ | python -
  ```

  Expected output: `PASS: 61 classes, semantic/accessibility structure, local resources, and no-JS/no-Grid CSS checks passed.`.

- [ ] **Step 4: Check whitespace with Git and stop without committing.**

  Run in PowerShell from the repository root:

  ```powershell
  git diff --check -- src/index.html src/css/style.css
  if ($LASTEXITCODE -ne 0) { Write-Output 'FAIL: git diff --check found whitespace errors'; exit 1 }
  Write-Output 'PASS: git diff --check found no whitespace errors'
  ```

  Expected output: `PASS: git diff --check found no whitespace errors` and no preceding Git diagnostic. Do not run `git commit`.

## Final binary checklist

### Approved class inventory — 60 Draw.io classes plus `.pagination`

- [ ] `header` appears in the DOM.
- [ ] `site-header` appears in the DOM.
- [ ] `left-side` appears in the DOM.
- [ ] `center` appears in the DOM.
- [ ] `right-side` appears in the DOM.
- [ ] `main-layout` appears in the DOM.
- [ ] `site-header__hamburger` appears in the DOM.
- [ ] `site-header__logo` appears in the DOM.
- [ ] `site-header__heading` appears in the DOM.
- [ ] `site-header__icon` appears in the DOM.
- [ ] `site-header__search-bar` appears in the DOM.
- [ ] `site-header__avatar` appears in the DOM.
- [ ] `sub-nav` appears in the DOM.
- [ ] `sub-nav__nav2` appears in the DOM.
- [ ] `sub-nav_nav1` appears in the DOM with the exact single underscore spelling.
- [ ] `sub-nav__nav3` appears in the DOM.
- [ ] `sub-nav__nav4` appears in the DOM.
- [ ] `sub-nav__nav5` appears in the DOM.
- [ ] `sub-nav__hamburger` appears in the DOM.
- [ ] `Page-title` appears in the DOM with the exact uppercase `P` and `T`.
- [ ] `Profile-avatar` appears in the DOM.
- [ ] `Profile-info` appears in the DOM.
- [ ] `Profile-info__heading` appears in the DOM.
- [ ] `Profile-info__meta` appears in the DOM.
- [ ] `Profile-action` appears in the DOM.
- [ ] `Profile-action__follow-btn` appears in the DOM.
- [ ] `popular-repos` appears in the DOM.
- [ ] `popular-repos__title` appears in the DOM.
- [ ] `popularrepo-card` appears in the DOM with the exact spelling.
- [ ] `popularrepo-card__heading` appears in the DOM.
- [ ] `popularrepo-card__description` appears in the DOM.
- [ ] `popularrepo-card__meta` appears in the DOM.
- [ ] `popularrepo-card__badge` appears in the DOM.
- [ ] `sub-heading` appears in the DOM.
- [ ] `sub-heading__title` appears in the DOM.
- [ ] `sub-heading__languages` appears in the DOM.
- [ ] `search-bar` appears in the DOM.
- [ ] `search-bar__icon` appears in the DOM.
- [ ] `search-bar__input` appears in the DOM.
- [ ] `search-bar__nav1` appears in the DOM.
- [ ] `search-bar__nav2` appears in the DOM.
- [ ] `search-bar__nav3` appears in the DOM.
- [ ] `fitter-btn` appears in the DOM with the exact spelling.
- [ ] `repo-list` appears in the DOM.
- [ ] `repo-card` appears in the DOM.
- [ ] `repo-card__title` appears in the DOM.
- [ ] `repo-card__header` appears in the DOM.
- [ ] `repo-card__desc` appears in the DOM.
- [ ] `repo-card__description` appears in the DOM.
- [ ] `repo-card__meta` appears in the DOM.
- [ ] `repo-card__badge` appears in the DOM.
- [ ] `sidebar-info` appears as the `aside` region.
- [ ] `sidebar-info_people` appears in the DOM with the exact single underscore spelling.
- [ ] `sidebar-info__heading` appears in the DOM.
- [ ] `sidebar-info__description` appears in the DOM.
- [ ] `sidebar-info__meta` appears in the DOM.
- [ ] `site-footer` appears as the `footer` region.
- [ ] `site-footer__logo` appears in the DOM.
- [ ] `site-footer__links` appears in the DOM.
- [ ] `site-footer__copyright` appears in the DOM.
- [ ] `pagination` appears in the DOM and is the only additional block.

### Layout, content, resources, and accessibility

- [ ] `src/index.html` exists and is the static GitHub Libraries page; `src/css/style.css` exists and is linked by the relative path `css/style.css`.
- [ ] The semantic landmark set is present: `header`, `nav`, `main#main-content`, `aside`, and `footer`.
- [ ] Exactly one `h1` exists, headings are in a sensible hierarchy, and the skip link targets exactly `#main-content`.
- [ ] Every input has a visible `label` or an accessible name; links, buttons, summary, and controls have clear names.
- [ ] Decorative SVGs have `aria-hidden="true"`; informative SVGs have an accessible label; images have suitable `alt` text.
- [ ] `:focus-visible` is clearly visible and Tab order reaches skip link, navigation, form control, native disclosure, follow, pagination, and footer links.
- [ ] `details/summary` provides the mobile navigation control without JavaScript.
- [ ] Desktop at `1200px` uses the centered `max-width: 1200px` container, 24px gutter, horizontal regions, Flexbox `.main-layout`, repo list beside sidebar, and centered pagination.
- [ ] Desktop at `768px` remains in desktop mode with no premature mobile collapse.
- [ ] Mobile at `767px` is one column, keeps `.repo-list` before `.sidebar-info`, and keeps pagination centered/reduced.
- [ ] Mobile at `375px` wraps long content and keeps all controls usable.
- [ ] There is no horizontal overflow, horizontal scrollbar, clipped content, fixed minimum width, negative-margin spill, or absolute-positioned layout at `1200px`, `768px`, `767px`, or `375px`.
- [ ] All icons/logos are inline SVG or all other assets are relative local paths; there are no CDN, font, iframe, `@import`, HTTP, or HTTPS resources.
- [ ] There is no JavaScript, framework, package/dependency, build step, CSS Grid, or dark mode.
- [ ] Search, filter, follow, and pagination are static presentation only; repository data, page labels, metadata, and footer links are hard-coded.
- [ ] `git diff --check -- src/index.html src/css/style.css` exits successfully with no whitespace diagnostic.
