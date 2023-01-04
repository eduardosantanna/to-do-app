import axios from 'axios'

import { Environment } from '@/shared/environment'
import { requestInterceptors } from '../interceptors/requestInterceptors'
import { responseInterceptors } from '../interceptors/responseInterceptors'
import { errorInterceptors } from '../interceptors/errorInterceptors'

export const Api = axios.create({
  baseURL: Environment.BASE_URL_API,
})

Api.interceptors.request.use((config) => requestInterceptors(config))
Api.interceptors.response.use(
  (response) => responseInterceptors(response),
  (error) => errorInterceptors(error)
)
