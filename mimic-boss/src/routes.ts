import { defineRoutes } from '@camomile.js/sdk'

export const routes = defineRoutes([
  {
    path: '/user',
    expose: './src/views/TemplateView.vue',
    component: () => import('@/views/TemplateView.vue'),
    meta: { title: '用户管理', icon: 'User' },
  },
])
