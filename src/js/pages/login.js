import { findAccountByIdentifier } from '../services/accountService.js';

const form = document.querySelector('.login-form');
const identifierInput = document.querySelector('#login-username');
const passwordInput = document.querySelector('#login-password');
const message = document.querySelector('.login-form__message');

const INCORRECT_MESSAGE = 'Incorrect username or password.';
const SUCCESS_MESSAGE = 'Signed in successfully.';

function showMessage(text, type) {
  message.textContent = text;
  message.classList.toggle('login-form__message--error', type === 'error');
  message.classList.toggle('login-form__message--success', type === 'success');
  message.hidden = false;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const identifier = identifierInput.value;
  const password = passwordInput.value;

  if (!identifier || !password) {
    showMessage(INCORRECT_MESSAGE, 'error');
    return;
  }

  const account = findAccountByIdentifier(identifier);

  if (!account || !account.login(identifier, password)) {
    showMessage(INCORRECT_MESSAGE, 'error');
    return;
  }

  showMessage(SUCCESS_MESSAGE, 'success');
});
