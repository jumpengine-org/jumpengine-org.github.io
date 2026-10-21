/**
 * VisitorCounter - 首页访客序号
 * 请求同域 /api/visit（由 Cloudflare Worker + KV 提供，见 cloudflare/visitor-counter/）
 */

const VISITOR_API = '/api/visit';

async function initVisitorCounter() {
  const countEl = document.getElementById('visitor-count');
  const wrapper = document.getElementById('visitor-counter');
  if (!countEl) return;

  try {
    const res = await fetch(VISITOR_API, { method: 'GET', cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const count = data.count;

    if (typeof count !== 'number' || count < 1) {
      throw new Error('Invalid counter response');
    }

    if (typeof Counter !== 'undefined') {
      new Counter(countEl, count, 1200, { useLocaleString: true }).start();
    } else {
      countEl.textContent = count.toLocaleString('zh-CN');
    }
  } catch (err) {
    console.warn('访客计数加载失败', err);
    if (wrapper) wrapper.hidden = true;
  }
}

document.addEventListener('DOMContentLoaded', initVisitorCounter);
