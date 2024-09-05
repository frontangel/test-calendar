import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('~/views/index.vue'),
    meta: {
      title: 'Home page'
    }
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: () => import('~/views/CalendarView.vue'),
    meta: {
      title: 'Calendar'
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('~/views/index.vue'),
    meta: {
      title: 'Page not found',
    }
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_PATH),
  routes
})

export default router
