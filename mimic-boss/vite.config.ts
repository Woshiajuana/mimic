import { fileURLToPath, URL } from 'node:url'

import federation from '@originjs/vite-plugin-federation'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import viteCompression from 'vite-plugin-compression'

import exposes from './exposes.json'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.__BASE__ || '/',

  define: {
    'process.env': process.env,
  },

  build: {
    target: 'esnext',
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  optimizeDeps: {
    exclude: ['virtual:__federation__'],
  },

  plugins: [
    vue(),

    vueJsx(),

    viteCompression(),

    // https://github.com/antfu/unplugin-auto-import
    // https://element-plus.org/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'typings/auto-imports.d.ts',
      resolvers: [
        (name) => {
          if (name.startsWith('El')) {
            return {
              name,
              from: 'element-plus',
            }
          }
        },
      ],
    }),

    Components({
      dts: 'typings/components.d.ts',
      extensions: ['ts', 'jsx', 'tsx', 'js', 'vue'],
      resolvers: [
        (name) => {
          if (name.startsWith('Pro')) {
            return {
              name,
              from: '@camomile.js/components',
            }
          }
        },
      ],
    }),

    federation({
      name: 'remote',
      filename: 'remoteEntry.js',
      remotes: {},
      exposes,
      shared: {
        vue: { generate: false },
        'vue-router': { generate: false },
        pinia: { generate: false },
        'pinia-plugin-persistedstate': { generate: false },
        'element-plus': { generate: false },
        '@element-plus/icons-vue': { generate: false },
        'async-validator': { generate: false },
        '@daysnap/banana': { generate: false },
        '@daysnap/utils': { generate: false },
        '@daysnap/vue-use': { generate: false },
        '@camomile.js/sdk': { generate: false },
        '@camomile.js/components': { generate: false },
      },
    }),
  ],

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
})
