/*
 * profile.js — phần tương tác của trang profile.
 *
 * Cố ý KHÔNG dùng import/export: file này chạy bằng thẻ <script> thường nên
 * Nguyên tắc: JS chỉ đổi TRẠNG THÁI (aria-expanded, hidden, class modifier),
 * còn hiện cái gì ra là việc của CSS. Không set style trực tiếp trong JS.
 *
 * Dữ liệu ở đây là DỮ LIỆU GIẢ. Sau này class User / Repository render thật
 * thì thay chỗ MOCK_TOTALS và bỏ hàm nhân bản đi.
 */

(function () {
  'use strict';

  // Năm đang hiển thị sẵn trong HTML. Mọi năm khác được nhân bản từ năm này.
  var TEMPLATE_YEAR = '2026';

  // Tổng số contribution giả cho từng năm.
  var MOCK_TOTALS = {
    2026: '1,847',
    2025: '2,134',
    2024: '1,592',
    2023: '968',
    2022: '431',
    2021: '117'
  };

  var activityList = document.querySelector('.contribution-activity__list');
  var showMoreButton = document.querySelector('.contribution-activity__expand-icon');
  var countHeading = document.querySelector('.contribution-graph__count');

  // Chụp lại HTML gốc của năm 2026 NGAY khi tải trang, trước khi có ai bấm gì.
  // Đây là bản mẫu để nhân ra các năm còn lại.
  var activityTemplate = activityList ? activityList.innerHTML : '';

  /* --------------------------------------------------------------------
   * Uỷ quyền sự kiện (event delegation)
   *
   * Gắn MỘT listener lên document thay vì gắn cho từng nút. Lý do: khi đổi
   * năm, toàn bộ activity bị vẽ lại — nếu gắn trực tiếp lên từng nút thì
   * các nút mới sẽ không có listener, bấm không ăn. Nghe ở document thì nút
   * sinh ra lúc nào cũng chạy được.
   * ------------------------------------------------------------------ */
  document.addEventListener('click', function (event) {
    var target = event.target;
    if (!target || !target.closest) return;

    var foldButton = target.closest('.activity-item__expand-btn');
    if (foldButton) {
      toggleActivityItem(foldButton);
      return;
    }

    if (showMoreButton && target.closest('.contribution-activity__expand-icon')) {
      revealNextPeriod();
      return;
    }

    var yearLink = target.closest('.year-selector__item');
    if (yearLink) {
      event.preventDefault();
      switchYear(yearLink);
    }
  });

  /* ---- Gập / mở một mục activity ------------------------------------- */
  function toggleActivityItem(button) {
    var item = button.closest('.activity-item');
    if (!item) return;

    var content = item.querySelector('.activity-item__content');
    if (!content) return;

    // aria-expanded là chuỗi "true"/"false", không phải boolean.
    var isOpen = button.getAttribute('aria-expanded') === 'true';

    button.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    content.hidden = isOpen;
  }

  /* ---- Show more activity: mở thêm một khối tháng --------------------- */
  function revealNextPeriod() {
    var periods = getPeriods();
    var next = null;

    periods.forEach(function (period) {
      if (!next && period.hidden) next = period;
    });

    if (next) next.hidden = false;

    // Hết khối để mở thì ẩn nút đi, không để nút bấm mà không có gì xảy ra.
    var stillHidden = periods.filter(function (period) {
      return period.hidden;
    });

    if (stillHidden.length === 0 && showMoreButton) {
      showMoreButton.hidden = true;
    }
  }

  function getPeriods() {
    if (!activityList) return [];
    return Array.prototype.slice.call(
      activityList.querySelectorAll('.contribution-activity__period')
    );
  }

  /* ---- Đổi năm -------------------------------------------------------- */
  function switchYear(link) {
    var year = link.getAttribute('data-year');
    if (!year) return;

    // 1. Chuyển modifier --active sang mục vừa bấm.
    var items = document.querySelectorAll('.year-selector__item');
    Array.prototype.forEach.call(items, function (item) {
      var isPicked = item === link;
      item.classList.toggle('year-selector__item--active', isPicked);
      if (isPicked) item.setAttribute('aria-current', 'page');
      else item.removeAttribute('aria-current');
    });

    // 2. Đổi dòng tiêu đề của biểu đồ.
    if (countHeading) {
      var total = MOCK_TOTALS[year] || '0';
      countHeading.textContent =
        year === TEMPLATE_YEAR
          ? total + ' contributions in the last year'
          : total + ' contributions in ' + year;
    }

    // 3. Vẽ lại danh sách activity.
    //    Nhân bản HTML của năm mẫu rồi thay số năm trong tiêu đề tháng.
    //    Đây là dữ liệu giả cho chạy được tab, chưa phải dữ liệu thật.
    if (activityList) {
      activityList.innerHTML = activityTemplate.split(TEMPLATE_YEAR).join(year);

      // Vẽ lại thì phải trả trạng thái về ban đầu: chỉ hiện khối tháng đầu.
      getPeriods().forEach(function (period, index) {
        period.hidden = index !== 0;
      });
      if (showMoreButton) showMoreButton.hidden = false;
    }

    // 4. Xáo lại độ đậm nhạt của lịch cho mỗi năm một dáng khác nhau.
    repaintCalendar(year);
  }

  /* ---- Tô lại lịch contribution --------------------------------------
   * Dùng công thức sinh số giả ngẫu nhiên có HẠT GIỐNG là số năm, nên cùng
   * một năm luôn ra đúng một hình — bấm qua bấm lại không nhảy lung tung.
   * ------------------------------------------------------------------ */
  function repaintCalendar(year) {
    var cells = document.querySelectorAll('.contribution-graph__calendar .contribution-graph__cell');
    if (!cells.length) return;

    var seed = Number(year) || 1;

    Array.prototype.forEach.call(cells, function (cell, index) {
      seed = (seed * 1103515245 + 12345) % 2147483648;
      var level = Math.floor((seed / 2147483648) * 5);

      for (var i = 0; i < 5; i += 1) {
        cell.classList.remove('contribution-graph__cell--l' + i);
      }
      cell.classList.add('contribution-graph__cell--l' + level);
    });
  }
})();
