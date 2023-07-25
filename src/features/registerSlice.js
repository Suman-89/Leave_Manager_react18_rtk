/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  employeeData: [],
}
const EmpLeaveData = createSlice({
  name: 'EmpLeaveData',
  initialState: initialState,
  reducers: {},
  extraReducers: {},
})

export default EmpLeaveData.reducer;