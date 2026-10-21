/**
 * JumpEngine 访客计数 Worker
 *
 * 部署步骤（Cloudflare 免费版即可）：
 * 1. 登录 Cloudflare Dashboard → Workers & Pages → KV → Create namespace（如 visitor-count）
 * 2. 将 wrangler.toml 中 KV namespace id 替换为刚创建的 ID
 * 3. 在本目录执行：npx wrangler deploy
 * 4. Workers → 你的 Worker → Settings → Triggers → Add route：
 *    jumpengine.org/api/visit
 * 5. 确保 jumpengine.org 的 DNS 已接入 Cloudflare（橙色云朵代理开启）
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (url.pathname !== '/api/visit' || request.method !== 'GET') {
      return new Response('Not Found', { status: 404 });
    }

    try {
      const raw = await env.VISITOR_COUNT.get('count');
      const newCount = parseInt(raw || '0', 10) + 1;
      await env.VISITOR_COUNT.put('count', String(newCount));

      return new Response(JSON.stringify({ count: newCount }), {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Cache-Control': 'no-store',
          ...CORS_HEADERS
        }
      });
    } catch {
      return new Response(JSON.stringify({ error: 'Counter unavailable' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...CORS_HEADERS
        }
      });
    }
  }
};
