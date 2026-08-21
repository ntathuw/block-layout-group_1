/**
 * Regex username theo quy tắc GitHub:
 * gồm chữ cái, số, `-`, `_`; không bắt đầu bằng `-`/`_`.
 */
const USERNAME_REGEX = /^[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Class `User` mô tả một người dùng GitHub.
 *
 * Kế thừa `AUser` để dùng lại `userId`, `accountId`, `displayName`.
 * Các thuộc tính bổ sung chủ yếu dùng để hiển thị lên trang profile.
 */
class User extends AUser {
  #username;
  #email;
  #avatarUrl;
  #bio;
  #location;
  #company;
  #websiteUrl;
  #followersCount;
  #followingCount;
  #publicReposCount;
  #createdAt;
  #updatedAt;
  #isEmailVerified;
  #isTwoFactorEnabled;
  #isActive;

  /**
   * @param {string} userId Mã định danh duy nhất của user.
   * @param {string} accountId Mã định danh account liên kết.
   * @param {string} displayName Tên hiển thị.
   * @param {object} [options] Các thuộc tính GitHub bổ sung.
   * @param {string} options.username Tên đăng nhập (username).
   * @param {string} options.email Email công khai/profile.
   * @param {string} [options.avatarUrl] URL avatar.
   * @param {string} [options.bio] Tiểu sử.
   * @param {string} [options.location] Vị trí.
   * @param {string} [options.company] Công ty.
   * @param {string} [options.websiteUrl] URL website cá nhân.
   * @param {number} [options.followersCount] Số người theo dõi.
   * @param {number} [options.followingCount] Số người đang theo dõi.
   * @param {number} [options.publicReposCount] Số repository công khai.
   * @param {boolean} [options.isEmailVerified] Email đã xác thực.
   * @param {boolean} [options.isTwoFactorEnabled] Bật xác thực hai yếu tố.
   * @param {boolean} [options.isActive] Tài khoản còn hoạt động.
   * @param {Date|string} [options.createdAt] Thời điểm tạo (mặc định hiện tại).
   */
  constructor(userId, accountId, displayName, options = {}) {
    super(userId, accountId, displayName);

    const now = new Date();
    this.#createdAt = options.createdAt ? new Date(options.createdAt) : now;
    this.#updatedAt = new Date(this.#createdAt);

    this.#avatarUrl = options.avatarUrl ?? null;
    this.#bio = options.bio ?? null;
    this.#location = options.location ?? null;
    this.#company = options.company ?? null;
    this.#followersCount = options.followersCount ?? 0;
    this.#followingCount = options.followingCount ?? 0;
    this.#publicReposCount = options.publicReposCount ?? 0;
    this.#isEmailVerified = options.isEmailVerified ?? false;
    this.#isTwoFactorEnabled = options.isTwoFactorEnabled ?? false;
    this.#isActive = options.isActive ?? true;

    // username: immutable → chỉ gán qua validator trong constructor.
    if (options.username !== undefined && options.username !== null) {
      this.#username = this.#validateUsername(options.username);
    }

    if (options.email !== undefined && options.email !== null) {
      this.email = options.email; // qua setter để validate
    }

    if (options.websiteUrl !== undefined && options.websiteUrl !== null) {
      this.websiteUrl = options.websiteUrl; // qua setter để validate
    }
  }

  // ==================== Getters ====================

  /** @returns {string} username. */
  get username() {
    return this.#username;
  }

  /** @returns {string} email. */
  get email() {
    return this.#email;
  }

  /** @returns {string|null} avatarUrl. */
  get avatarUrl() {
    return this.#avatarUrl;
  }

  /** @returns {string|null} bio. */
  get bio() {
    return this.#bio;
  }

  /** @returns {string|null} location. */
  get location() {
    return this.#location;
  }

  /** @returns {string|null} company. */
  get company() {
    return this.#company;
  }

  /** @returns {string|null} websiteUrl. */
  get websiteUrl() {
    return this.#websiteUrl;
  }

  /** @returns {number} followersCount. */
  get followersCount() {
    return this.#followersCount;
  }

  /** @returns {number} followingCount. */
  get followingCount() {
    return this.#followingCount;
  }

  /** @returns {number} publicReposCount. */
  get publicReposCount() {
    return this.#publicReposCount;
  }

  /** @returns {Date} createdAt. */
  get createdAt() {
    return this.#createdAt;
  }

  /** @returns {Date} updatedAt. */
  get updatedAt() {
    return this.#updatedAt;
  }

  /** @returns {boolean} isEmailVerified. */
  get isEmailVerified() {
    return this.#isEmailVerified;
  }

  /** @returns {boolean} isTwoFactorEnabled. */
  get isTwoFactorEnabled() {
    return this.#isTwoFactorEnabled;
  }

  /** @returns {boolean} isActive. */
  get isActive() {
    return this.#isActive;
  }

  // ==================== Setters ====================

  /** @param {string} value Email mới (validate định dạng). */
  set email(value) {
    if (typeof value !== 'string' || !EMAIL_REGEX.test(value)) {
      throw new InvalidEmailException(`email không hợp lệ: ${value}`);
    }
    this.#email = value;
    this.#touch();
  }

  /** @param {string|null} value Avatar URL. */
  set avatarUrl(value) {
    this.#avatarUrl = value ?? null;
    this.#touch();
  }

  /** @param {string|null} value Bio. */
  set bio(value) {
    this.#bio = value ?? null;
    this.#touch();
  }

  /** @param {string|null} value Location. */
  set location(value) {
    this.#location = value ?? null;
    this.#touch();
  }

  /** @param {string|null} value Company. */
  set company(value) {
    this.#company = value ?? null;
    this.#touch();
  }

  /** @param {string|null} value Website URL (validate nếu không null). */
  set websiteUrl(value) {
    if (value === null || value === undefined || value === '') {
      this.#websiteUrl = null;
      this.#touch();
      return;
    }

    let parsed;
    try {
      parsed = new URL(value);
    } catch {
      throw new InvalidUrlException(`websiteUrl không hợp lệ: ${value}`);
    }

    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      throw new InvalidUrlException(`websiteUrl phải dùng http/https: ${value}`);
    }

    this.#websiteUrl = value;
    this.#touch();
  }

  /** @param {number} value Số người theo dõi. */
  set followersCount(value) {
    this.#followersCount = Number(value) || 0;
  }

  /** @param {number} value Số người đang theo dõi. */
  set followingCount(value) {
    this.#followingCount = Number(value) || 0;
  }

  /** @param {number} value Số repository công khai. */
  set publicReposCount(value) {
    this.#publicReposCount = Number(value) || 0;
  }

  /** @param {boolean} value Email đã xác thực. */
  set isEmailVerified(value) {
    this.#isEmailVerified = Boolean(value);
  }

  /** @param {boolean} value Bật xác thực hai yếu tố. */
  set isTwoFactorEnabled(value) {
    this.#isTwoFactorEnabled = Boolean(value);
  }

  /** @param {boolean} value Trạng thái hoạt động. */
  set isActive(value) {
    this.#isActive = Boolean(value);
    this.#touch();
  }

  // ==================== Public methods ====================

  /**
   * Trả về object gồm các trường hiển thị lên trang profile.
   * KHÔNG lộ `accountId` (thông tin nhạy cảm).
   *
   * @returns {object} Public profile.
   */
  getPublicProfile() {
    return {
      userId: this.userId,
      username: this.#username,
      displayName: this.displayName,
      email: this.#email,
      avatarUrl: this.#avatarUrl,
      bio: this.#bio,
      location: this.#location,
      company: this.#company,
      websiteUrl: this.#websiteUrl,
      followersCount: this.#followersCount,
      followingCount: this.#followingCount,
      publicReposCount: this.#publicReposCount,
      isEmailVerified: this.#isEmailVerified,
      isTwoFactorEnabled: this.#isTwoFactorEnabled,
      isActive: this.#isActive,
      createdAt: this.#createdAt,
    };
  }

  // ==================== Private helpers ====================

  /**
   * Kiểm tra username theo quy tắc GitHub.
   *
   * @param {string} value Username cần kiểm tra.
   * @returns {string} Username hợp lệ.
   * @throws {InvalidUsernameException} Nếu không hợp lệ.
   */
  #validateUsername(value) {
    if (
      typeof value !== 'string' ||
      value.length < 1 ||
      value.length > 39 ||
      !USERNAME_REGEX.test(value)
    ) {
      throw new InvalidUsernameException(`username không hợp lệ: ${value}`);
    }
    return value;
  }

  /** Cập nhật thời điểm thay đổi gần nhất. */
  #touch() {
    this.#updatedAt = new Date();
  }
}
