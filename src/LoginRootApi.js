/* eslint-disable prettier/prettier */
import axios from 'axios'
import { loginBaseUrl } from './constants/index'
import axiosRetry from 'axios-retry'

const loginUrl = axios.create({
  loginApi: loginBaseUrl,
})
axiosRetry(loginUrl, { retries: 3 })

const resetInterceptor = (token) => {
//   console.log('UserToken_interceptors:', token)
  loginUrl.interceptors.request.use((config) => {
    // console.log('UserToken_Token:', token)

    config.headers.Authorization = token ? `Bearer ${token}` : ''

    return config
  })
}

export { loginUrl as Default }
export { resetInterceptor }
