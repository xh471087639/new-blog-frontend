import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import postCssPxToRem from 'postcss-pxtorem';
import autoprefixer from 'autoprefixer';

const { VantResolver } = require('unplugin-vue-components/resolvers');
const Components = require('unplugin-vue-components/vite');

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            dirs: ['src'],
            resolvers: [VantResolver()],
        }),
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
                additionalData: '@import "./src/assets/style/global.less";@import "./src/assets/style/iconfont.less";',
                javascriptEnabled: true,/*这个可以解决less方法无法执行的问题*/
                rewriteUrls:'all'/*这个解决字体图标无法显示的问题*/
            },
        },
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
