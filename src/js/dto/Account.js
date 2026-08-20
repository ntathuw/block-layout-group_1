import AAccount from './AAccount.js';
import { AuthenticationFailedException } from '../error/errors.js';
import {
  PATHS,
  readRecords,
  upsertRecord,
} from '../fileio/fileStore.js';

/**
 * Class `Account` mô tả tài khoản đăng nhập GitDemo, liên kết 1-1 với `User`.
 *
 * Kế thừa `AAccount` để dùng lại `accountId`, `password`, `role`;
 * bắt buộc override 2 abstract method `isLogin()` và `login()`.
 *
 * Scope hiện tại chỉ đăng nhập: xác thực password + role `user`,
 * ghi phiên vào `session.txt`.
 */
export default class Account extends AAccount {
  #userId;
  #password;
  #isLoggedIn;
  #lastLoginAt;

  /**
   * @param {string} accountId Mã định danh account.
   * @param {string} password Mật khẩu (plain-text).
   * @param {string} role Vai trò (role).
   * @param {object} [options] Thuộc tính bổ sung.
   * @param {string} [options.userId] Mã user liên kết.
   */
  constructor(accountId, password, role, options = {}) {
    super(accountId, password, role);

    // AAccount không có getter cho password (chỉ có setter), nên Account
    // tự lưu lại mật khẩu để dùng cho việc xác thực.
    this.#password = password;
    this.#userId = options.userId ?? null;
    this.#isLoggedIn = false;
    this.#lastLoginAt = null;
  }

  // ==================== Getters ====================

  /** @returns {string|null} userId liên kết. */
  get userId() {
    return this.#userId;
  }

  /** @returns {Date|null} lastLoginAt. */
  get lastLoginAt() {
    return this.#lastLoginAt;
  }

  // ==================== Abstract method overrides ====================

  /**
   * Kiểm tra account hiện tại có đang đăng nhập hay không — dựa trên
   * `session.txt` (danh sách user đang đăng nhập).
   * {@inheritdoc}
   *
   * @returns {Promise<boolean>} `true` nếu có phiên cho `accountId` này.
   */
  async isLogin() {
    const sessions = await readRecords(PATHS.session);
    return sessions.some((session) => session.accountId === this.accountId);
  }

  /**
   * Đăng nhập cho account hiện tại.
   * {@inheritdoc}
   *
   * Chỉ cho phép role `user`; sai mật khẩu hoặc sai role → ném lỗi.
   * Đăng nhập thành công → ghi phiên vào `session.txt`.
   *
   * @param {string} passwordInput Mật khẩu do người dùng nhập.
   * @returns {Promise<boolean>} `true` khi đăng nhập thành công.
   * @throws {AuthenticationFailedException} Nếu role khác `user`
   *   hoặc mật khẩu không đúng.
   */
  async login(passwordInput) {
    if (this.role !== 'user') {
      throw new AuthenticationFailedException('chỉ user mới được đăng nhập');
    }

    if (passwordInput !== this.#password) {
      throw new AuthenticationFailedException('mật khẩu không đúng');
    }

    this.#isLoggedIn = true;
    this.#lastLoginAt = new Date();

    await this.#saveSession();

    return true;
  }

  // ==================== Private helpers ====================

  /**
   * Ghi (upsert) phiên của account hiện tại vào `session.txt`.
   *
   * @returns {Promise<void>}
   */
  async #saveSession() {
    return upsertRecord(
      PATHS.session,
      (session) => session.accountId === this.accountId,
      {
        accountId: this.accountId,
        userId: this.#userId,
        loginAt: this.#lastLoginAt.toISOString(),
      },
    );
  }
}
