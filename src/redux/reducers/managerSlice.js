/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import { managerNameAction } from '../action/managerNameAction'

const initialState = {
  manager: [],
  isloading: true,
}

const ManagerNameSlice = createSlice({
  name: 'manager',
  initialState: initialState,
  reducers: {},
  extraReducers: function (builder) {
    builder.addCase(managerNameAction.pending, (state) => {
      state.isloading = true
    })
    builder.addCase(managerNameAction.fulfilled, (state, action) => {
      state.isloading = false
      state.manager = action.payload
    })
    builder.addCase(managerNameAction.rejected, (state) => {
      state.isloading = true
      state.manager = []
    })
  },
})

export default ManagerNameSlice.reducer
