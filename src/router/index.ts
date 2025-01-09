import { createRouter, createWebHistory } from 'vue-router'
import isAuthenticatedGuard from './auth-guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      redirect: '/dash',
    },
    {
      path: '/login',
      redirect: '/auth/login',
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../auth/layouts/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('../auth/pages/LoginPage.vue'),
        },
        {
          path: 'signup',
          name: 'signup',
          component: () => import('../auth/pages/RegisterPage.vue'),
        },
      ],
    },
    {
      path: '/dash',
      name: 'dash',
      component: () => import('../features/admin/layouts/AdminLayout.vue'),
      beforeEnter: [isAuthenticatedGuard],
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../features/admin/pages/DashHomePage.vue'),
        },
        {
          path: 'proposal',
          name: 'new-proposal',
          component: () => import('../features/admin/pages/CreateProposalPage.vue'),
        },
        {
          path: 'edit-proposal/:id',
          name: 'edit-proposal',
          component: () => import('../features/admin/pages/EditProposalPage.vue'),
        },
      ],
    },
  ],
})

export default router
