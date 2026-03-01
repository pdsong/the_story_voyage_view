import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../utils/api'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<Record<string, unknown> | null>(null) // Will type this later when models are clear
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = () => !!token.value

  const setToken = (newToken: string) => {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  const clearAuth = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }

  const login = async (credentials: Record<string, unknown>) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.post('/auth/login', credentials)
      // Assuming response.data contains a token and user info based on typical Phoenix setup.
      // E.g., { data: { token: '...', user: {...} } } or similar
      const receivedToken = response.data.token || response.data.data?.token
      if (receivedToken) {
        setToken(receivedToken)
      }
      user.value = response.data.user || response.data.data?.user || null
      return true
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } }
      error.value = e.response?.data?.message || 'Login failed'
      return false
    } finally {
      loading.value = false
    }
  }

  const register = async (userData: Record<string, unknown>) => {
    loading.value = true
    error.value = null
    try {
      const response = await api.post('/auth/register', userData)
      const receivedToken = response.data.token || response.data.data?.token
      if (receivedToken) {
        setToken(receivedToken)
      }
      user.value = response.data.user || response.data.data?.user || null
      return true
    } catch (err: unknown) {
      const e = err as { response?: { data?: { message?: string } } }
      error.value = e.response?.data?.message || 'Registration failed'
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    clearAuth()
    // Optional: Call logout endpoint if your backend has one
  }

  return { token, user, loading, error, isAuthenticated, login, register, logout }
})
