/* eslint-disable prettier/prettier */
import { createAsyncThunk } from '@reduxjs/toolkit'
import API from '../../api'
//register new
export const empRegister = createAsyncThunk('emp/register', async (newRegData) => {
  console.log('newRegData:', newRegData)
  const registeredNew = await API.post('/wp-jwt/v1/create-new-user', newRegData)
  console.log('registeredNew-->', registeredNew?.data?.data?.data)
  if (registeredNew.status === 200) {
    return registeredNew?.data?.data?.data
  }
})
