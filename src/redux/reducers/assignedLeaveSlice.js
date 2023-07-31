/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import { assignedLeavesAction } from '../action/assignedLeavesAction'

const initialState = {
  leaves: [],
  loading: true,
}

const AssignedLeaveSlice = createSlice({
  name: 'noOfLeaves',
  initialState: initialState,
  reducers: {},
  extraReducers: function (builder) {
    builder.addCase(assignedLeavesAction.pending, (state) => {
      state.loading = true
    })
    builder.addCase(assignedLeavesAction.fulfilled, (state, action) => {
      state.loading = false
      state.leaves = action.payload
    })
    builder.addCase(assignedLeavesAction.rejected, (state) => {
      state.loading = true
      state.leaves = []
    })
  },
})

export default AssignedLeaveSlice.reducer
