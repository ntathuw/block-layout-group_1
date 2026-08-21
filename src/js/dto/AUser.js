class AUser {
  #userId;
  #accountId;
  #displayName;

  constructor(userId, accountId, displayName) {
    if (new.target === AUser) {
      throw new TypeError('AUser is an abstract class and cannot be instantiated directly.');
    }

    this.#userId = userId;
    this.#accountId = accountId;
    this.#displayName = displayName;
  }

  get userId() {
    return this.#userId;
  }

  get accountId() {
    return this.#accountId;
  }

  get displayName() {
    return this.#displayName;
  }

  set displayName(value) {
    this.#displayName = value;
  }
}
