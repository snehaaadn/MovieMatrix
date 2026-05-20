import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { handleVibeSearchRequest } from './lib/vibeSearch.js'

function getServerEnv() {
  const env = loadEnv('development', process.cwd(), '');
  return {
    VITE_TMDB_API_KEY: env.VITE_TMDB_API_KEY,
    VITE_TMDB_API_BASE_URL: env.VITE_TMDB_API_BASE_URL,
    OPENAI_API_KEY: env.OPENAI_API_KEY,
    TMDB_API_KEY: env.VITE_TMDB_API_KEY,
    TMDB_API_BASE_URL: env.VITE_TMDB_API_BASE_URL,
  };
}

function vibeSearchDevPlugin() {
  return {
    name: 'vibe-search-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/vibe-search')) return next();

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
          res.statusCode = 200;
          res.end();
          return;
        }

        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk) => { body += chunk; });
        req.on('end', async () => {
          try {
            const result = await handleVibeSearchRequest(body, getServerEnv());
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(result));
          } catch (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: err.message || 'Vibe search failed' }));
          }
        });
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), vibeSearchDevPlugin()],
});
