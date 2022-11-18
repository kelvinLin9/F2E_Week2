import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/UserSign',
    name: 'UserSign',
    component: () => import('../views/UserSign.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
