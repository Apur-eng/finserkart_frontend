import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const targetBackend = env.VITE_API_BASE_URL || 'http://localhost:80';

  return {
    plugins: [react()],
    server: {
      port: 5173,
      proxy: {
        '/search_services.php': {
          target: targetBackend,
          changeOrigin: true,
          secure: false,
        },
        '/api.function': {
          target: targetBackend,
          changeOrigin: true,
          secure: false,
        },
        '/customer.php': {
          target: targetBackend,
          changeOrigin: true,
          secure: false,
        },
        '/agent.php': {
          target: targetBackend,
          changeOrigin: true,
          secure: false,
        },
        '/ca-login.php': {
          target: targetBackend,
          changeOrigin: true,
          secure: false,
        },
        '/customer/api': {
          target: targetBackend,
          changeOrigin: true,
          secure: false,
        },
        '/customer/logout.php': {
          target: targetBackend,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
