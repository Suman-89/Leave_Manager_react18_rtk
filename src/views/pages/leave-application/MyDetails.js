/* eslint-disable prettier/prettier */
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import React, { useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import { MyDetailsAction } from 'src/redux/action/myDetailsAction'

const MyDetails = () => {
  const dispatch = useDispatch()
  const {userInfo,isLoading,error,success} = useSelector((state)=>state.empLeaveDetails)
  useEffect(()=>{
    dispatch(MyDetailsAction())
  },[])

  const columns = [
    {
      name: 'Sl. No.',
      selector : (row,index)=>index+1
    },
    {
      name: 'Project Manager',
      selector : (row)=>row.display_name,
    },
    {
      name: 'Department',
      selector : (row)=>row.dept_name,
    },
    {
      name: 'Start Date',
      selector : (row)=>row.start_date,
    },
    {
      name: 'End Date',
      selector : (row)=>row.end_date,
    },
    {
      name: 'Status',
      selector : (row)=>row.status,
    },
  ]
  return (
    <>
       <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>Leave Application Details</strong>
                </CCardHeader>
                <CCardBody>
                   <DataTable columns={columns} data={userInfo}/>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
    </>
  )
}

export default MyDetails
