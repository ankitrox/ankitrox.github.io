import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: './index.html', // Default entry point
        services: './services.html',
        privacyPolicy: './privacy-policy.html',
        terms: './terms.html',
        refundPolicy: './refund-policy.html',
      },
      external: ['typed.js'], // Exclude specific modules from bundling
    },
  },
});
