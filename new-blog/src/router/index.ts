import { createRouter, createWebHistory, RouterOptions } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/Home/index.vue'),
        },
    ],
} as RouterOptions)

export default router
