import { createSlice } from '@reduxjs/toolkit'
import { managerNameAction } from '../action/managerNameAction'

const initialState = {
  managerList: [],
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
      state.managerList = action.payload
    })
    builder.addCase(managerNameAction.rejected, (state) => {
      state.isloading = true
      state.managerList = []
    })
  },
})

export default ManagerNameSlice.reducer
