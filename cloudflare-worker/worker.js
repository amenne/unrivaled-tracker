/**
 * Cloudflare Worker - CORS Proxy for Unrivaled Basketball
 *
 * Deploy this worker at Cloudflare and update your app.js CONFIG.CORS_PROXIES
 * to use your worker URL as the first option.
 *
 * Example: https://your-worker-name.your-subdomain.workers.dev/
 */

const ALLOWED_ORIGIN = 'https://www.unrivaled.basketball';

// Paths we allow proxying
const ALLOWED_PATHS = ['/standings', '/schedule', '/'];

export default {
  async fetch(request) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return handleCORS();
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // Validate path
    if (!ALLOWED_PATHS.some(p => path === p || path.startsWith(p + '/'))) {
      return new Response('Not found', { status: 404 });
    }

    try {
      // Fetch from unrivaled.basketball
      const targetUrl = ALLOWED_ORIGIN + path;

      const response = await fetch(targetUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; UnrivaledTracker/1.0)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
        },
      });

      // Get the response body
      const body = await response.text();

      // Return with CORS headers
      return new Response(body, {
        status: response.status,
        headers: {
          'Content-Type': response.headers.get('Content-Type') || 'text/html',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Cache-Control': 'public, max-age=60', // Cache for 1 minute
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  },
};

function handleCORS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}
