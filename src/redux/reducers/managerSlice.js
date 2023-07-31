/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import { managerNameAction } from '../action/managerNameAction'

const initialState = {
  manager: [],
  loading: true,
}

const ManagerNameSlice = createSlice({
  name: 'noOfLeaves',
  initialState: initialState,
  reducers: {},
  extraReducers: function (builder) {
    builder.addCase(managerNameAction.pending, (state) => {
      state.loading = true
    })
    builder.addCase(managerNameAction.fulfilled, (state, action) => {
      state.loading = false
      state.manager = action.payload
    })
    builder.addCase(managerNameAction.rejected, (state) => {
      state.loading = true
      state.manager = []
    })
  },
})

export default ManagerNameSlice.reducer
