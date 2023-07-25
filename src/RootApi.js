/* eslint-disable prettier/prettier */
import axios from 'axios'
import { baseApiUrl } from './constants/index'

export const rootApi = axios.create({
  baseURL: baseApiUrl,
})
