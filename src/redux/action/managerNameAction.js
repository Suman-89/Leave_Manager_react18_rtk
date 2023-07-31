/* eslint-disable prettier/prettier */
import { createAsyncThunk } from '@reduxjs/toolkit'
import API from '../../api'

export const managerNameAction = createAsyncThunk('leaves/numbers', async () => {
  const managerName = await API.get(`/wp-jwt/v1/employee-projectmanager-relation`)
  console.log('leaveResponse:', managerName)
  // if(leaveResponse.status === 200){
  // return leaveResponse.data.data
  // }
})
