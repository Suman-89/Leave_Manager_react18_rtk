/* eslint-disable prettier/prettier */
import { createSlice } from '@reduxjs/toolkit'
import { userLoginAction } from 'src/action/loginAction'

const initialState = {
  empLoginData: {},
  isLoading: false
}

const loginSlice = createSlice({
    name:'loginSlice',
    initialState:initialState,
    reducers:{},
    extraReducers: function(builder) {
        builder.addCase(userLoginAction.pending,(state)=>{
            state.isLoading = true
        })
        builder.addCase(userLoginAction.fulfilled,(state,action)=>{
            state.isLoading = false
            state.empLoginData = action.payload
        })
        builder.addCase(userLoginAction.rejected,(state)=>{
            state.isLoading=true
            state.empLoginData={}
        })
    }
})

export default loginSlice.reducer