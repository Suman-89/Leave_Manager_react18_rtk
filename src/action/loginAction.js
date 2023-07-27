/* eslint-disable prettier/prettier */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { loginBaseUrl } from 'src/constants'

export const userLoginAction = createAsyncThunk('user/login',async (userLoginData)=>{
    console.log('userLoginData:', userLoginData)
    const loginApiResponse = await loginBaseUrl.post(`/token`,userLoginData) 
    console.log('loginApiResponse:',loginApiResponse)
})
