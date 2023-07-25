/* eslint-disable prettier/prettier */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { rootApi } from '../RootApi'

export const empRegister = createAsyncThunk('emp/register', (newRegData) => {
  console.log('newRegData:', newRegData)
})
