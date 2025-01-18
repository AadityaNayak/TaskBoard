import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enable global test functions like 'describe' and 'it'
    environment: 'jsdom', // Use a browser-like environment
    setupFiles: './setupTests.js', // Path to your test setup file
  },
});
