class AAccount {
  #accountId;
  #password;
  #role;

  constructor(accountId, password, role) {
    if (new.target === AAccount) {
      throw new TypeError('AAccount is an abstract class and cannot be instantiated directly.');
    }

    this.#accountId = accountId;
    this.#password = password;
    this.#role = role;
  }

  get accountId() {
    return this.#accountId;
  }

  set password(value) {
    this.#password = value;
  }

  matchesPassword(input) {
    return input === this.#password;
  }

  get role() {
    return this.#role;
  }

  set role(value) {
    this.#role = value;
  }

  isLogin(callback) {
    throw new Error('isLogin() is an abstract method and must be implemented by a subclass.');
  }

  login(password, callback) {
    throw new Error('login() is an abstract method and must be implemented by a subclass.');
  }
}
