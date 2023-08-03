/* eslint-disable prettier/prettier */
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from '../../api'


export const ApplyLeaveAction = createAsyncThunk('apply/leave', async (submittedLeaveData) => {
    console.log('submittedLeaveData:', submittedLeaveData)
    const submitLeaveResponse = await API.post(`/wp-jwt/v1/apply-leave`,submittedLeaveData)
    console.log('submitLeaveResponse:',submitLeaveResponse)
    if(submitLeaveResponse.status === 200){
        return submitLeaveResponse.data.data
    }
})