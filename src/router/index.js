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
      },
      {
        path: '/admin/technologies',
        name: 'technologies',
        component: () => import('@/components/admin/technology/Technologies.vue')
      },
      {
        path: '/admin/technology-items',
        name: 'technologyItems',
        component: () => import('@/components/admin/technologyItem/TechnologyItems.vue')
      },
      {
        path: '/admin/projects',
        name: 'projects',
        component: () => import('@/components/admin/project/Projects.vue')
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
