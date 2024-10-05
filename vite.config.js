import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/1001-tools',
  plugins: [vue()],
  resolve: {
    alias: {
      src: path.resolve('./src'),
      root: path.resolve('./'),
    },
  },
});
