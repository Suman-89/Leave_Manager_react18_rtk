/* eslint-disable prettier/prettier */
import { createAsyncThunk } from "@reduxjs/toolkit"
import API from '../../api'

export const MyDetailsAction = createAsyncThunk('empLeave/detail', async ()=>{
    const leaveDetails = await API.get(`/wp-jwt/v1/apply-leave-details`)
    // console.log('leaveDetails:',leaveDetails.data.data.reverse())
    if(leaveDetails.status === 200){
        return leaveDetails.data.data
        // return leaveDetails.data.data
    }
})
