import AAccount from './AAccount.js';

export default class GithubAccount extends AAccount {
  #username;
  #email;
  #isLoggedIn;

  constructor({ accountId, username, email, password, role }) {
    super(accountId, password, role);
    this.#username = username;
    this.#email = email;
    this.#isLoggedIn = false;
  }

  get username() {
    return this.#username;
  }

  get email() {
    return this.#email;
  }

  matchesIdentifier(input) {
    if (typeof input !== 'string') {
      return false;
    }
    const value = input.trim().toLowerCase();
    return (
      value !== '' &&
      (this.#username.toLowerCase() === value || this.#email.toLowerCase() === value)
    );
  }

  login(identifier, password) {
    if (!this.matchesIdentifier(identifier) || !this.checkPassword(password)) {
      this.#isLoggedIn = false;
      return false;
    }
    this.#isLoggedIn = true;
    return true;
  }

  isLogin() {
    return this.#isLoggedIn;
  }
}
