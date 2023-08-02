/* eslint-disable prettier/prettier */
import { createAsyncThunk } from "@reduxjs/toolkit";

export const ApplyLeaveAction = createAsyncThunk('apply/leave', (submittedLeaveData) => {
    console.log('submittedLeaveData:', submittedLeaveData)
})