import type { AxiosError } from 'axios'

import { useAuthStore } from '@/shared/stores/auth'

export const errorInterceptors = async (error: AxiosError) => {
  const authStore = useAuthStore()

  if (error.response?.status === 401) {
    if (error.response.data === 'Invalid credentials') {
      return Promise.reject(new Error('Invalid credentials'))
    }

    await authStore.logout()
    return Promise.reject(new Error('Session expired! Make a new login'))
  }

  return Promise.reject(error)
}
