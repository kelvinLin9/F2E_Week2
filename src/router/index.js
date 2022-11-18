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
    component: () => import('../views/UserSign.vue'),
    children: [
      {
        path: 'MakeSign',
        name: 'MakeSign',
        component: () => import('../views/MakeSign.vue')
      },
      {
        path: 'EditPDF',
        name: 'EditPDF',
        component: () => import('../views/EditPDF.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
