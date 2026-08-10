# Spec: Header nav icons + repo-card meta/sparkline

## 1. Mục tiêu

1. Header: bỏ icon sách dư (`.site-header__icon`); chỉnh cụm `.site-header__nav` khớp gốc (Copilot▾ · +▾ · Issues · PR · YouTube · Inbox+dot · avatar).
2. Repo-card: chấm màu ngôn ngữ, icon meta (★ / license / fork / issues / PR), sparkline xanh bên phải.

## 2. Thay đổi

### 2.1 Header

- Xóa `<span class="site-header__icon">…</span>` + CSS `.site-header__icon` (desktop + mobile hide).
- Giữ block `.site-header__nav` + `.site-header__nav-item`.
- Thứ tự icon (trái → phải):
  1. Copilot (2 avatar + chevron xuống)
  2. Create (`+` + chevron)
  3. Issues (vòng tròn)
  4. Pull requests (git)
  5. YouTube (play / video)
  6. Inbox (hộp thư + chấm xanh `.site-header__nav-dot`)
  7. Avatar (`.site-header__avatar`)
- Bỏ icon Bell; Inbox thay Notifications.
- Màu icon muted/sáng như gốc; search giữ nguyên.

### 2.2 Repo-card meta + sparkline

Mỗi `.repo-card`:

- Layout: flex row — body (title/badge/desc/meta) trái, sparkline phải.
- Meta: chấm màu (`--dot-color`) + tên ngôn ngữ; icon SVG ★ + số; scale license; fork; issues; PR; text "Updated …".
- Sparkline: SVG polyline/path màu `#3fb950`, class `repo-card__sparkline`, `aria-hidden="true"`.
- Class mới tối thiểu: `repo-card__sparkline`; meta items dùng structure trong `.repo-card__meta` (span + svg inline), không bắt buộc element BEM mới nếu selector element đủ.

### 2.3 Ngoài scope

- Không đổi sub-nav tabs/badge.
- Không đổi data sang daze/pabtc…; giữ react/vue/tensorflow.
- Không JS, network asset, framework.

## 3. Acceptance

- [ ] Không còn `.site-header__icon` trong HTML/CSS.
- [ ] `.site-header__nav` đủ 6 nút đúng thứ tự + avatar.
- [ ] Mỗi repo-card: chấm ngôn ngữ + icon meta + sparkline phải.
- [ ] Mobile không overflow ngang.
- [ ] `git diff --check` sạch.
