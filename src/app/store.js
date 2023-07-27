/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit'
import RegisterSlice from '../features/registerSlice'
import loginSlice from 'src/features/loginSlice'

export const store = configureStore({
  reducer: {
    register: RegisterSlice,
    login:loginSlice
  },
})
