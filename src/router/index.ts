import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
  ],
})

// Optional Navigation Guard Example
// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore()
//   if (to.meta.requiresAuth && !authStore.isAuthenticated()) {
//     next({ name: 'login' })
//   } else {
//     next()
//   }
// })

export default router
