import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import injectLokiFreemarkerPlugin from './plugins/injectLokiFreemarker';
import injectDevMainPlugin from './plugins/injectDevMain';
import lokiConfig from './loki.config.mjs';
import postcss from './postcss.config.cjs';

const { resolve } = require('path');

export default defineConfig({
  root: './',
  base: process.env.NODE_ENV === 'production' ? `/${lokiConfig.appName}/api/urn/com/loki/core/model/api/modelResource/v/urn/com/${lokiConfig.cloudName}/${lokiConfig.appName}/app/pages/${lokiConfig.pageName}/` : '/',
  plugins: [
    svelte(),
    injectDevMainPlugin(),
    injectLokiFreemarkerPlugin(),
  ],
  css: {
    postcss,
  },
  // optimizeDeps: {
  //   exclude: [
  //     '@sveltestack/svelte-query',
  //     'svelte/animate',
  //     'svelte/easing',
  //     'svelte/internal',
  //     'svelte/motion',
  //     'svelte/store',
  //     'svelte/transition',
  //     'svelte',
  //     'svelte-hmr/runtime/hot-api-esm.js',
  //     'svelte-hmr/runtime/proxy-adapter-dom.js',
  //     'svelte-hmr'
  //   ]
  // },
  build: {
    rollupOptions: {
      input: {
        html: resolve(__dirname, 'index.html'),
        main: resolve(__dirname, 'src/main.ts'),
      },
    },
    outDir: 'dist',
    assetsDir: './',
  },
});
