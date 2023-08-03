/* eslint-disable prettier/prettier */
import { createSlice } from "@reduxjs/toolkit"
import { ApplyLeaveAction } from "../action/applyLeaveAction"

const initialState = {
    appliedLeaveData: {},
    isLoading:true,
}

const ApplyLeaveSlice = createSlice({
    name: 'leaveData',
    initialState:initialState,
    reducers:{},
    extraReducers:function (builder){
        builder.addCase(ApplyLeaveAction.pending,(state)=>{
            state.isLoading = true
        })
        builder.addCase(ApplyLeaveAction.fulfilled,(state,action)=>{
            state.isLoading = false
            state.appliedLeaveData = action.payload
        })
        builder.addCase(ApplyLeaveAction.rejected,(state)=>{
            state.isLoading = true
            state.appliedLeaveData = {}
        })
    }
})

export default ApplyLeaveSlice.reducer