/* eslint-disable prettier/prettier */
import axios from 'axios'
import { baseApiUrl } from './constants'
import axiosRetry from 'axios-retry'

const API = axios.create({
  baseURL: baseApiUrl,
})
axiosRetry(API, { retries: 3 })

API.interceptors.request.use((config) => {
  const userData = localStorage.getItem('userLogData')
  const currentUser = JSON.parse(userData)
  console.log('userData@@@@@-->', currentUser)

  config.headers.Authorization = userData ? `Bearer ${currentUser.token}` : ''

  return config
})

// after invalid token logout
API.interceptors.response.use(
  (config) => {
    // console.log('config', config);
    return config
  },
  (err) => {
    // console.log('err', err.response, err.data, err.message)
    // console.log('err', err.response.data.code)
    if (err.response.data.code === 'jwt_auth_invalid_token' || err.response.status === 403) {
      localStorage.removeItem('lMuserDataToken')
      window.location.reload()
      window.location.href = '/'
    }
  },
)

export { API as default }
