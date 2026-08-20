import Account from '../dto/Account.js';
import { AuthenticationFailedException } from '../error/errors.js';
import { PATHS, readRecords } from '../fileio/fileStore.js';

/**
 * Service xử lý đăng nhập (thuần logic, không phụ thuộc DOM/HTML).
 *
 * Luồng: nhận `identifier` (username hoặc email) + `password`,
 * tra `user.txt` → tìm account tương ứng trong `account.txt`
 * → gọi `account.login(password)`. Thành công → `Account` ghi phiên
 * vào `session.txt`.
 */
export const authService = {
  /**
   * Đăng nhập bằng username hoặc email kèm password.
   *
   * @param {string} identifier username hoặc email.
   * @param {string} password Mật khẩu.
   * @returns {Promise<boolean>} `true` khi đăng nhập thành công.
   * @throws {AuthenticationFailedException} Khi không tìm thấy user/account,
   *   hoặc sai mật khẩu, hoặc role không phải `user`.
   */
  async login(identifier, password) {
    const users = await readRecords(PATHS.user);
    const userRecord = users.find(
      (record) => record.username === identifier || record.email === identifier,
    );

    if (!userRecord) {
      throw new AuthenticationFailedException('sai username/email hoặc mật khẩu');
    }

    const accounts = await readRecords(PATHS.account);
    const accountRecord = accounts.find(
      (record) => record.accountId === userRecord.accountId,
    );

    if (!accountRecord) {
      throw new AuthenticationFailedException('sai username/email hoặc mật khẩu');
    }

    const account = new Account(
      accountRecord.accountId,
      accountRecord.password,
      accountRecord.role,
      { userId: accountRecord.userId },
    );

    return account.login(password);
  },
};
