/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit'
import EmpLeaveData from '../features/registerSlice'

export const store = configureStore({
  reducer: {
    leaveData: EmpLeaveData,
  },
})
