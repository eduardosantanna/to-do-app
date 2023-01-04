import { useAuthStore } from '@/shared/stores/auth'
import type { AxiosRequestConfig } from 'axios'

export const requestInterceptors = (config: AxiosRequestConfig) => {
  const auth = useAuthStore()
  config.headers = {
    Authorization: `Bearer ${auth.getCurrentToken}`,
    'Content-Type': 'multipart/form-data',
  }
  return config
}
