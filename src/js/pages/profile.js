/*
 * profile.js — hai nút gập/mở của trang profile.
 *
 * Cố ý KHÔNG dùng import/export: file này chạy bằng thẻ <script> thường nên
 * mở bằng Live Server hay mở thẳng file .html đều chạy. ES module bắt buộc
 * phải có server, mở file:// là chết.
 *
 * Nguyên tắc: JS chỉ đổi TRẠNG THÁI (thuộc tính aria-expanded, hidden),
 * còn hiện cái gì ra là việc của CSS. Không set style trực tiếp trong JS.
 */

(function () {
  'use strict';

  // ---- 1. Gập / mở từng mục activity -------------------------------------
  var expandButtons = document.querySelectorAll('.activity-item__expand-btn');

  Array.prototype.forEach.call(expandButtons, function (button) {
    button.addEventListener('click', function () {
      // closest() đi ngược lên tìm thẻ cha gần nhất khớp selector.
      var item = button.closest('.activity-item');
      if (!item) return;

      var content = item.querySelector('.activity-item__content');
      if (!content) return;

      // aria-expanded là chuỗi "true"/"false", không phải boolean.
      var isOpen = button.getAttribute('aria-expanded') === 'true';

      button.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      content.hidden = isOpen;
    });
  });

  // ---- 2. Show more activity ---------------------------------------------
  var showMoreButton = document.querySelector('.contribution-activity__expand-icon');
  var periods = document.querySelectorAll('.contribution-activity__period');

  if (showMoreButton) {
    showMoreButton.addEventListener('click', function () {
      // Tìm khối tháng đầu tiên còn đang ẩn rồi mở nó ra.
      var next = null;
      Array.prototype.forEach.call(periods, function (period) {
        if (!next && period.hidden) next = period;
      });

      if (next) next.hidden = false;

      // Hết khối để mở thì ẩn luôn nút đi, không để nút bấm mà không có gì xảy ra.
      var stillHidden = Array.prototype.filter.call(periods, function (period) {
        return period.hidden;
      });

      if (stillHidden.length === 0) showMoreButton.hidden = true;
    });
  }
})();
