import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('../components/LoginForm.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../components/RegisterForm.vue')
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  console.log('Navigation guard: isAuthenticated =', authStore.isAuthenticated)

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    console.log('Redirecting to login...')
    next('/login')
  } else if (to.path === '/login' && authStore.isAuthenticated) {
    console.log('Already authenticated, redirecting to dashboard...')
    next('/dashboard')
  } else {
    next()
  }
})

export default router
