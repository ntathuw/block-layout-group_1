import { createServer } from 'node:http';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { authService } from '../js/service/authService.js';

const PORT = process.env.PORT || 8000;

// Thư mục gốc `src/` để phục vụ file tĩnh (login.html, index.html, css, ...).
const ROOT = fileURLToPath(new URL('..', import.meta.url));

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
};

/**
 * Trả về object gồm body (đã parse nếu là JSON) và trạng thái đọc xong.
 */
function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
      if (data.length > 1_000_000) {
        const err = new Error('request body quá lớn');
        err.statusCode = 413;
        reject(err);
      }
    });
    req.on('end', () => {
      if (!data) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(data));
      } catch {
        const err = new Error('body không phải JSON hợp lệ');
        err.statusCode = 400;
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

async function serveStatic(res, urlPath) {
  // Chặn path traversal, chỉ phục vụ trong thư mục ROOT.
  const safePath = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
  let filePath = path.join(ROOT, safePath);

  if (safePath === '/' || safePath === '') {
    filePath = path.join(ROOT, 'index.html');
  }

  try {
    const content = await fs.readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(content);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  // API đăng nhập.
  if (req.method === 'POST' && url.pathname === '/api/login') {
    try {
      const body = await readBody(req);
      const { identifier, password } = body;

      if (!identifier || !password) {
        sendJson(res, 400, { ok: false, message: 'thiếu username/email hoặc mật khẩu' });
        return;
      }

      await authService.login(identifier, password);
      sendJson(res, 200, { ok: true });
    } catch (error) {
      // Nếu response đã bị huỷ/đóng (client ngắt kết nối), không gửi gì thêm.
      if (res.writableEnded || res.destroyed) {
        return;
      }
      const status = error.statusCode || 500;
      sendJson(res, status, { ok: false, message: error.message });
    }
    return;
  }

  // Các route còn lại: phục vụ file tĩnh.
  if (req.method === 'GET') {
    await serveStatic(res, url.pathname);
    return;
  }

  sendJson(res, 405, { ok: false, message: 'method not allowed' });
});

server.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
