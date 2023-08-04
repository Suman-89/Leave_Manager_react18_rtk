/* eslint-disable prettier/prettier */
import { cilLowVision } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormSwitch, CRow, CSpinner } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import { MyDetailsAction } from 'src/redux/action/myDetailsAction'
import API from '../../../api'

const MyDetails = () => {
  const dispatch = useDispatch()
  const { userInfo, isLoading, error, success } = useSelector((state) => state.empLeaveDetails)
  //search operation state //
  const [filteredUserInfo, setFilteredUserInfo] = useState([])
  const [searchItem, setSearchItem] = useState("")

  console.log('userInfo:',userInfo)

  const handleSearch = async () => {
    try {
      const sData = await API.get(`/wp-jwt/v1/apply-leave-details`)
      console.log('sData:', sData.data.data)
      setFilteredUserInfo(sData.data.data)
    } catch (err) {
      console.log('error:', err)
    }
  }

  useEffect(() => {
    handleSearch()
    dispatch(MyDetailsAction())
  }, [])

  useEffect(() => {
    const searchResult = userInfo.filter((userResult) =>{
      return userResult.display_name.toLowerCase().match(searchItem.toLowerCase())
    })
    setFilteredUserInfo(searchResult)
  }, [searchItem])

  const columns = [
    {
      name: 'Sl. No.',
      selector: (row, index) => index + 1
    },
    {
      name: 'Project Manager',
      selector: (row) => row.display_name,
    },
    {
      name: 'Department',
      selector: (row) => row.dept_name,
    },
    {
      name: 'Start Date',
      selector: (row) => row.start_date,
    },
    {
      name: 'End Date',
      selector: (row) => row.end_date,
    },
    {
      name: 'Status',
      cell: (row) => row.status,
    },
    {
      name: 'View/Chat',
      cell: (row) => <div className='col' style={{ alignItems: 'center' }}><CButton className='rounded-pill'>
        <i className='fa fa-eye'></i>
      </CButton>&nbsp;
        <CButton color='success' className='rounded-pill'>
          <i className='far fa-comment-dots'></i>
        </CButton></div>
    },
    {
      name: 'Action',
      cell: (row) => <CFormSwitch reverse type="radio" color='danger' />
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
              {
                isLoading === true ? (
                  <CSpinner color="secondary"/>
                ): success === false ? (
                  {error}
                ):(
                  <DataTable
                  columns={columns}
                  data={filteredUserInfo}
                  pagination
                  paginationPerPage={5}
                  paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
                  highlightOnHover
                  subHeader
                  subHeaderComponent={
                    <>
                      <CFormInput className='w-50 form-control' type="text"
                        placeholder="Search by name/ department"
                        value={searchItem}
                        onChange={(e)=>setSearchItem(e.target.value)}
                         />
                      <CButton className='mx-2 col-2' color="primary" onClick={()=>setSearchItem('')} >Reset</CButton>
                    </>
                  }
                />
                )
              }
         
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default MyDetails
