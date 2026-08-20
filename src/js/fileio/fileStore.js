import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Thư mục chứa các file dữ liệu (JSON Lines):
 * `account.txt`, `user.txt`, `session.txt` nằm ở `src/js/data/`.
 */
const DATA_DIR = fileURLToPath(new URL('../data', import.meta.url));

/**
 * Đường dẫn của các file dữ liệu.
 */
export const PATHS = Object.freeze({
  account: path.join(DATA_DIR, 'account.txt'),
  user: path.join(DATA_DIR, 'user.txt'),
  session: path.join(DATA_DIR, 'session.txt'),
});

/**
 * Đọc toàn bộ records của một file dữ liệu (định dạng JSON Lines).
 * Mỗi dòng không rỗng là một object JSON.
 *
 * @param {string} filePath Đường dẫn file.
 * @returns {Promise<object[]>} Danh sách records (mảng rỗng nếu file chưa tồn tại).
 */
export async function readRecords(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return content
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line) => JSON.parse(line));
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

/**
 * Ghi đè toàn bộ nội dung file bằng danh sách records (JSON Lines).
 *
 * @param {string} filePath Đường dẫn file.
 * @param {object[]} records Danh sách records cần ghi.
 * @returns {Promise<void>}
 */
export async function writeRecords(filePath, records) {
  let content = records.map((record) => JSON.stringify(record)).join('\n');
  if (content) {
    content += '\n';
  }
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, 'utf8');
}

/**
 * Thêm một record vào cuối file.
 *
 * @param {string} filePath Đường dẫn file.
 * @param {object} record Record cần thêm.
 * @returns {Promise<void>}
 */
export async function appendRecord(filePath, record) {
  const records = await readRecords(filePath);
  records.push(record);
  await writeRecords(filePath, records);
}

/**
 * Cập nhật record khớp `matchFn` (thay thế); nếu không khớp thì thêm vào cuối.
 *
 * @param {string} filePath Đường dẫn file.
 * @param {(record: object) => boolean} matchFn Hàm xác định record cần thay thế.
 * @param {object} record Record mới.
 * @returns {Promise<void>}
 */
export async function upsertRecord(filePath, matchFn, record) {
  const records = await readRecords(filePath);
  const index = records.findIndex(matchFn);
  if (index === -1) {
    records.push(record);
  } else {
    records[index] = record;
  }
  await writeRecords(filePath, records);
}

/**
 * Xóa các record khớp `matchFn`.
 *
 * @param {string} filePath Đường dẫn file.
 * @param {(record: object) => boolean} matchFn Hàm xác định record cần xóa.
 * @returns {Promise<void>}
 */
export async function removeRecords(filePath, matchFn) {
  const records = await readRecords(filePath);
  const filtered = records.filter((record) => !matchFn(record));
  await writeRecords(filePath, filtered);
}
