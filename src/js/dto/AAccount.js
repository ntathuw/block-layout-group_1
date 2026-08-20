export default class AAccount {
  #accountId;
  #password;
  #role;
  #isLogin;

  constructor(accountId, password, role) {
    if (new.target === AAccount) {
      throw new TypeError('AAccount is an abstract class and cannot be instantiated directly.');
    }

    this.#accountId = accountId;
    this.#password = password;
    this.#role = role;
    this.#isLogin = false;
  }

  get accountId() {
    return this.#accountId;
  }

  set accountId(value) {
    this.#accountId = value;
  }

  get password() {
    return this.#password;
  }

  set password(value) {
    this.#password = value;
  }

  get role() {
    return this.#role;
  }

  set role(value) {
    this.#role = value;
  }

  isLogin() {
    throw new Error('isLogin() is an abstract method and must be implemented by a subclass.');
  }

  login() {
    throw new Error('login() is an abstract method and must be implemented by a subclass.');
  }
}
