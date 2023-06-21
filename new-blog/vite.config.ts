import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import postCssPxToRem from 'postcss-pxtorem';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
    ],
    css: {
        postcss: {
            plugins: [
                postCssPxToRem({
                    rootValue: 41.4, // 1rem的大小
                    propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
                    selectorBlackList: ['__vconsole']
                }),
                autoprefixer(),
            ]
        },
        // css预处理器
        preprocessorOptions: {
            less: {
                charset: false,
                additionalData: '@import "./src/assets/style/global.less";',
            },
        },
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
