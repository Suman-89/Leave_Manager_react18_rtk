import { createAsyncThunk } from '@reduxjs/toolkit'
import API from '../../api'

export const managerNameAction = createAsyncThunk('manager/namelist', async () => {
  const managerName = await API.get(`/wp-jwt/v1/employee-projectmanager-relation`)
  console.log('managerName:', managerName.data.data)
  if (managerName.status === 200) {
    return managerName.data.data
  }
})
