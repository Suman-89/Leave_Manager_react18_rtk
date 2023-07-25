/* eslint-disable prettier/prettier */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { rootApi } from '../RootApi'

//register new
export const empRegister = createAsyncThunk('emp/register', async (newRegData) => {
  console.log('newRegData:', newRegData)
  const registeredNew = await rootApi.post('/create-new-user',newRegData)
  console.log('registeredNew-->',registeredNew?.data?.data?.data)
  if(registeredNew.status === 200){
    return registeredNew?.data?.data?.data
  }
})
