import { defineConfig, type UserConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import laravel from 'vite-plugin-laravel';
import { visualizer } from 'rollup-plugin-visualizer';
import inertia from './resources/scripts/vite/inertia-layout';
import { createVuePlugin as vue } from 'vite-plugin-vue2';
import checker from 'vite-plugin-checker';
import path from 'path';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }): Promise<UserConfig> => {
  const config: UserConfig = {
    // https://vitejs.dev/config/#server-options
    server: {
      fs: {
        // Allow serving files from one level up to the project root
        allow: ['..'],
      },
      host: '0.0.0.0',
    },
    plugins: [
      // Inertia
      // https://inertiajs.com/
      inertia(),
      // Laravel Vite
      // https://laravel-vite.dev/
      laravel({
        postcss: [tailwindcss(), autoprefixer()],
      }),
      // Vue2
      // https://github.com/underfin/vite-plugin-vue2
      vue({
        target: 'esnext',
      }),
      // vite-plugin-checker
      // https://github.com/fi3ework/vite-plugin-checker
      checker({
        typescript: true,
        vueTsc: true,
        eslint: {
          lintCommand: 'eslint', // for example, lint .ts & .tsx
        },
      }),
    ],
    // Build Options
    // https://vitejs.dev/config/#build-options
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Split external library from transpiled code.
            vue: [
              'vue',
              'vue-router',
              'vue2-teleport',
              'vue2-helpers',
              'vue2-helpers/vue-router',
              'vue2-helpers/vuex',
              'vuex',
              'deepmerge',
              '@vue/composition-api',
            ],
            inertia: [
              '@inertiajs/inertia-vue/dist/index.js',
              '@inertiajs/inertia',
              'axios',
              'get-intrinsic',
              'lodash.clonedeep',
              'lodash.isequal',
              'object-inspect',
              'qs',
            ],
          },
          plugins: [
            mode === 'analyze'
              ? // rollup-plugin-visualizer
                // https://github.com/btd/rollup-plugin-visualizer
                visualizer({
                  open: true,
                  filename: './stats.html',
                  gzipSize: true,
                  brotliSize: true,
                })
              : undefined,
            /*
            // if you use Code encryption by rollup-plugin-obfuscator
            // https://github.com/getkey/rollup-plugin-obfuscator
            obfuscator({
              globalOptions: {
                debugProtection: true,
              },
            }),
            */
          ],
        },
      },
      target: 'es2021',
      /*
      // Minify option
      // https://vitejs.dev/config/#build-minify
      minify: 'terser',
      terserOptions: {
        ecma: 2020,
        parse: {},
        compress: { drop_console: true },
        mangle: true, // Note `mangle.properties` is `false` by default.
        module: true,
        output: { comments: true, beautify: false },
      },
      */
    },
  };

  // Write meta data.
  fs.writeFileSync(
    path.resolve(path.join(__dirname, 'resources/scripts/meta.ts')),
    `// This file is auto-generated by the build system.
export default {
  date: '${new Date().toISOString()}',
};`
  );

  return config;
});
