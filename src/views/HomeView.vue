<script setup lang="ts">
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <main>
    <h1>Welcome to The Story Voyage</h1>
    <div v-if="authStore.isAuthenticated()">
      <p>Hello! You are logged in.</p>
    </div>
    <div v-else>
      <p>Please log in or register to continue.</p>
    </div>
  </main>
</template>
