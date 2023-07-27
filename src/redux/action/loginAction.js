/* eslint-disable prettier/prettier */
import { createAsyncThunk } from '@reduxjs/toolkit'
import rootApi from '../../RootApi'

export const userLoginAction = createAsyncThunk('user/login',async (userLoginData)=>{
    console.log('userLoginData:', userLoginData)
    const loginApiResponse = await rootApi.post(`/jwt-auth/v1/token`,userLoginData) 
    console.log('loginApiResponse:',loginApiResponse)
    if(loginApiResponse.status === 200){
        return loginApiResponse.data
    }
})
