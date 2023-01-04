import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'

import AuthService from '@/shared/services/api-to-do-list/AuthService/AuthService'

export const useAuthStore = defineStore('auth', () => {
  const currentToken = ref<string>()

  const isAuthenticated = () => {
    const token = localStorage.getItem('oat')
    if (token) currentToken.value = token
    return !!currentToken.value
  }

  const login = async (
    email: string,
    password: string
  ): Promise<Error | void> => {
    const token = await AuthService.login(email, password)
    if (token instanceof Error) return new Error(token.message)
    currentToken.value = token
    localStorage.setItem('oat', token)
    return
  }

  const logout = async () => {
    await AuthService.logout()
    localStorage.removeItem('oat')
    currentToken.value = undefined
    await router.push('/login')
  }

  const getCurrentToken = computed(() => currentToken.value)

  return { login, logout, isAuthenticated, getCurrentToken }
})
