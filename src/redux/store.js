/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit'
import RegisterSlice from './reducers/registerSlice'
import AssignedLeaveSlice from './reducers/assignedLeaveSlice'
import ManagerNameSlice from './reducers/managerSlice'

export const store = configureStore({
  reducer: {
    register: RegisterSlice,
    leaves: AssignedLeaveSlice,
    managerName: ManagerNameSlice,
  },
})
