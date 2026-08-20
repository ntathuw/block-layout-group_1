// Script điều khiển form đăng nhập trên `login.html`.
// Gọi API `/api/login` (do `src/server.js` xử lý), thành công thì điều hướng
// về trang chủ `index.html`.

const form = document.querySelector('.login-form');
const usernameInput = document.getElementById('login-username');
const passwordInput = document.getElementById('login-password');
const submitButton = document.querySelector('.login-form__submit');

// Khu vực hiển thị lỗi (tự tạo nếu DOM chưa có).
let errorBox = document.querySelector('.login-form__error');
if (!errorBox) {
  errorBox = document.createElement('p');
  errorBox.className = 'login-form__error';
  errorBox.style.color = '#cf222e';
  errorBox.style.marginTop = '12px';
  errorBox.style.display = 'none';
  form.appendChild(errorBox);
}

function showError(message) {
  errorBox.textContent = message;
  errorBox.style.display = 'block';
}

function clearError() {
  errorBox.textContent = '';
  errorBox.style.display = 'none';
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  clearError();

  const identifier = usernameInput.value.trim();
  const password = passwordInput.value;

  if (!identifier || !password) {
    showError('Vui lòng nhập username/email và mật khẩu.');
    return;
  }

  submitButton.disabled = true;

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password }),
    });

    const result = await response.json();

    if (result.ok) {
      // Đăng nhập thành công -> điều hướng về trang chủ.
      window.location.href = '/index.html';
    } else {
      showError(result.message || 'Đăng nhập thất bại.');
    }
  } catch (error) {
    showError('Không thể kết nối tới server.');
  } finally {
    submitButton.disabled = false;
  }
});
