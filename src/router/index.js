import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/components/Main.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    redirect: { name: 'types' },
    component: () => import('@/components/admin/Admin.vue'),
    children: [
      {
        path: '/admin/types',
        name: 'types',
        component: () => import('@/components/admin/type/Types.vue')
      },
      {
        path: '/admin/stages',
        name: 'stages',
        component: () => import('@/components/admin/stage/Stages.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes
})

export default router
