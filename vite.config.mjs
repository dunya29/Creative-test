import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import autoprefixer from 'autoprefixer'
import mqpacker from 'node-css-mqpacker'
import sortMediaQueries from 'postcss-sort-media-queries'
import postcssMqLast from 'postcss-mq-last'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'
import { imagetools } from 'vite-imagetools'
import VitePluginWebpAndPath from 'vite-plugin-webp-and-path'
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        ViteImageOptimizer({}),//public img optimize
        imagetools(), //src img optimize convert to webp
        VitePluginWebpAndPath({
            targetDir: './src/assets/images/content/webp',
            quality: 100
        }),    
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
        postcss: {
            plugins: [
                autoprefixer({
                    overrideBrowserslist: [
                        'last 2 version',
                        '> 1%'
                    ]
                }),
                mqpacker(),
                sortMediaQueries({
                    sort: 'mobile-first' // default
                }),
                postcssMqLast(),
            ],
        },  
    } 
})
