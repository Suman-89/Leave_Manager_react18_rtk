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
  rootApi.interceptors.response.use((config)=>{
    console.log('config_interceptor:',config)
    return config;
  },
  (err)=>{
    console.log('err_interceptor:',err)
    if(err.response.data.code === "jwt_auth_bad_auth_header"){
      localStorage.removeItem('empLogData')
      window.location.reload()
      window.location.href='/'
    }
  }
  )
}

export { rootApi as default }
export { resetInterceptor }
