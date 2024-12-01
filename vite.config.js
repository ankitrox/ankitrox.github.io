import { defineConfig } from 'vite';
import { resolve } from 'path';
import { writeFileSync } from 'fs';
import react from '@vitejs/plugin-react';

// Add a custom plugin to ensure CNAME is added to dist
const addCNAMEPlugin = () => {
  return {
    name: 'add-cname',
    closeBundle() {
      const cnamePath = resolve(__dirname, 'dist', 'CNAME');
      writeFileSync(cnamePath, 'ankitgade.in');
      console.log('CNAME file created!');
    },
  };
};

export default defineConfig({
  plugins: [
    react(),
    addCNAMEPlugin(),
  ],
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
