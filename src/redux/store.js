/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit'
import RegisterSlice from './reducers/registerSlice'

export const store = configureStore({
  reducer: {
    register: RegisterSlice,
  },
})
