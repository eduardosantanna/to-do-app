import type { AxiosError } from 'axios'
import { useToast } from 'vue-toastification'

import { useAuthStore } from '@/shared/stores/auth'

export const errorInterceptors = async (error: AxiosError) => {
  const toast = useToast()
  const authStore = useAuthStore()

  if (error.response?.status === 401) {
    await authStore.logout()
    return Promise.reject(new Error('Session expired! Make a new login'))
  }

  return Promise.reject(error)
}
