/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit'
import RegisterSlice from './reducers/registerSlice'
import LoginSlice from 'src/redux/reducers/loginSlice'

export const store = configureStore({
  reducer: {
    register: RegisterSlice,
    login: LoginSlice
  },
})
