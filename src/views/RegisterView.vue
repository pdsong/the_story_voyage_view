<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const email = ref('')
const username = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()

const handleRegister = async () => {
  const success = await authStore.register({
    email: email.value,
    username: username.value,
    password: password.value,
  })
  if (success) {
    router.push({ name: 'home' })
  }
}
</script>

<template>
  <main>
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <div>
        <label for="email">Email:</label>
        <input id="email" v-model="email" type="email" required />
      </div>
      <div>
        <label for="username">Username:</label>
        <input id="username" v-model="username" type="text" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <button type="submit" :disabled="authStore.loading">
        {{ authStore.loading ? 'Registering...' : 'Register' }}
      </button>
      <p v-if="authStore.error" style="color: red">{{ authStore.error }}</p>
    </form>
  </main>
</template>
