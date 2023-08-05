/* eslint-disable prettier/prettier */
import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormSwitch, CRow, CSpinner } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux'
import { MyDetailsAction } from 'src/redux/action/myDetailsAction'
import API from '../../../api'
import moment from 'moment/moment'
import ReactSwitch from 'react-switch'

const MyDetails = () => {
  const dispatch = useDispatch()
  const { userInfo, isLoading } = useSelector((state) => state.empLeaveDetails)
  //search operation state //
  const [filteredUserInfo, setFilteredUserInfo] = useState([])
  const [searchItem, setSearchItem] = useState("")
  //switch
  const [checked,setChecked] = useState(false)

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

  const viewClick = (vId)=>{
    console.log('vId:',vId)
  }

  const StartDate =({row}) => moment().format('Do-MMM-yyyy')
  const EndDate =({row}) => moment().format('Do-MMM-yyyy')


  const columns = [
    {
      name: 'Sl. No.',
      selector: (row, index) => index + 1
    },
    {
      name: 'Project Manager',
      selector: (row) => row.display_name,
      sortable :true
    },
    {
      name: 'Department',
      selector: (row) => row.dept_name,
      sortable :true
    },
    {
      name: 'Start Date',
      selector: (row) => row.start_date,
      cell:(sdRow) => <StartDate row={sdRow} />,
      sortable :true
    },
    {
      name: 'End Date',
      selector: (row) => row.end_date,
      cell:(edRow) => <EndDate row={edRow} />,
      sortable :true
    },
    {
      name: 'Status',
      cell: (row) => row.status,
    },
    {
      name: 'View/Chat',
      cell: (row) => <div className='col' style={{ alignItems: 'center' }}>
        <CButton className='rounded-pill' 
        onClick={()=>viewClick(row.id)}
      >
        <i className='fa fa-eye'></i>
      </CButton>&nbsp;
        <CButton color='success' className='rounded-pill'
        >
          <i className='far fa-comment-dots'></i>
        </CButton></div>
    },
    {
      name: 'Action',
      cell: (row) => <ReactSwitch
      onChange={() => setChecked(true)}
      checked={checked}
      className="react-switch"
    />
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
