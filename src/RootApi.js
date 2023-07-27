/* eslint-disable prettier/prettier */
import axios from 'axios'
import { baseApiUrl } from './constants'
import axiosRetry from 'axios-retry'


const rootApi = axios.create({
  baseURL: baseApiUrl,
})
axiosRetry(rootApi, { retries: 3 })

const resetInterceptor = (token) => {
//   console.log('UserToken_interceptors:', token)
rootApi.interceptors.request.use((config) => {
    // console.log('UserToken_Token:', token)

    config.headers.Authorization = token ? `Bearer ${token}` : ''

    return config
  })
}

export { rootApi as default }
export { resetInterceptor }
