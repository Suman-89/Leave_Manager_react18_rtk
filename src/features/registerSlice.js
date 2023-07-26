/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'
import { empRegister } from 'src/action/reduxAction'
const initialState = {
  employeeRegisterData: {},
  loading: false,
  error: null,
}
const RegisterSlice = createSlice({
  name: 'RegisterSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: function(builder) {
    //register new start//
    builder.addCase(empRegister.pending,(state)=>{
      state.loading=true
    });
    builder.addCase(empRegister.fulfilled,(state,action)=>{
      state.employeeRegisterData = action.payload
      state.loading=false
    });
    builder.addCase(empRegister.rejected,(state,action)=>{
      state.loading=false
      state.error=action.payload
    });
    //register new end//
  },
})

export default RegisterSlice.reducer
