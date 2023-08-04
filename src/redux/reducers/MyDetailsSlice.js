/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit"
import { MyDetailsAction } from "../action/myDetailsAction"


const initialState = {
    userInfo : [],
    isLoading : true,
    error : '',
    success: false
}

const MyDetailsSlice = createSlice({
    name:'myDetails',
    initialState : initialState,
    reducers:{},
    extraReducers:function(builder){
        builder.addCase(MyDetailsAction.pending,(state)=>{
            state.isLoading = true
            state.success = false
        })
        builder.addCase(MyDetailsAction.fulfilled,(state,action)=>{
            state.isLoading = false
            state.success = true
            state.userInfo = action.payload
        })
        builder.addCase(MyDetailsAction.rejected,(state)=>{
            state.isLoading = true
            state.success = false
            state.error = 'Unable to fetch data'
            state.userInfo = []
        })
    }
})

export default MyDetailsSlice.reducer