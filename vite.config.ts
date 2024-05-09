/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/test-setup.ts',
  },
});
