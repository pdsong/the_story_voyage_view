<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <header>
    <nav style="display: flex; gap: 1rem; padding: 1rem; background: #f0f0f0">
      <RouterLink to="/">Home</RouterLink>
      <div v-if="!authStore.isAuthenticated()" style="display: flex; gap: 1rem">
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
      </div>
      <div v-else>
        <button @click="handleLogout">Logout</button>
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
