/* eslint-disable prettier/prettier */
import { createAsyncThunk } from '@reduxjs/toolkit'
import API from '../../api'

export const assignedLeavesAction = createAsyncThunk('leaves/numbers', async ()=>{
    const leaveResponse = await API.get(`/wp-jwt/v1/employee-leave-list`)
    console.log('leaveResponse:',leaveResponse.data.data)
    if(leaveResponse.status === 200){
    return leaveResponse.data.data
    }
})
