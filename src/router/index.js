import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/components/Main.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/auth/Login.vue')
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: 'NotFound' */ '@/components/errors/NotFound')
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
        component: () => import('@/components/admin/type/Types.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/admin/stages',
        name: 'stages',
        component: () => import('@/components/admin/stage/Stages.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/admin/technologies',
        name: 'technologies',
        component: () => import('@/components/admin/technology/Technologies.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/admin/technology-items',
        name: 'technologyItems',
        component: () => import('@/components/admin/technologyItem/TechnologyItems.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/admin/projects',
        name: 'projects',
        component: () => import('@/components/admin/project/Projects.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: '/admin/users',
        name: 'users',
        component: () => import('@/components/admin/user/Users.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes
})

/**
 * Before router actions.
 */
router.beforeEach((to, from, next) => {
  // Is user authorised
  const isAuthorized = store.getters['authorization/isAuthorized']

  // If user is authorised and router path is login, then 404 error
  if (isAuthorized && to.name === 'login') {
    next({ name: '404' })
  } else if (!isAuthorized && to.matched.some(record => record.meta.requiresAuth)) {
    // If user is not authorised and router path is requires authorization, then redirect to login form
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
