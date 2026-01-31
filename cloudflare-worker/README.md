# Cloudflare Worker Setup for Unrivaled Tracker

This worker acts as a CORS proxy to fetch data from unrivaled.basketball.

## Quick Setup (5 minutes)

### 1. Create a Cloudflare Account
Go to [cloudflare.com](https://cloudflare.com) and sign up (free).

### 2. Create a Worker
1. Go to **Workers & Pages** in the Cloudflare dashboard
2. Click **Create Application** → **Create Worker**
3. Give it a name like `unrivaled-proxy`
4. Click **Deploy**

### 3. Add the Code
1. Click **Edit Code** on your new worker
2. Delete the default code
3. Copy/paste the contents of `worker.js` into the editor
4. Click **Save and Deploy**

### 4. Get Your Worker URL
Your worker URL will be something like:
```
https://unrivaled-proxy.YOUR-SUBDOMAIN.workers.dev
```

### 5. Update Your App
Edit `app.js` and add your worker URL as the FIRST proxy:

```javascript
const CONFIG = {
    CORS_PROXIES: [
        'https://unrivaled-proxy.YOUR-SUBDOMAIN.workers.dev',  // Your worker
        // ... other fallback proxies
    ],
    // ...
};
```

## Testing

Visit these URLs in your browser to test:
- `https://your-worker.workers.dev/standings`
- `https://your-worker.workers.dev/schedule`

You should see the HTML content from unrivaled.basketball.

## Free Tier Limits

Cloudflare Workers free tier includes:
- 100,000 requests per day
- Unlimited bandwidth
- Global edge deployment

This is more than enough for a personal tracker app!
