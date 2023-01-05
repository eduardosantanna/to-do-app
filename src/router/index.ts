import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { useAuthStore } from '@/shared/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      redirect: '/login',
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      beforeEnter: (to, from, next) => {
        const auth = useAuthStore()
        if (auth.isAuthenticated()) next()
        else next({ name: 'login' })
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: (to, from, next) => {
        const auth = useAuthStore()
        if (auth.isAuthenticated()) next({ name: 'home' })
        else next()
      },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
  ],
})

export default router
