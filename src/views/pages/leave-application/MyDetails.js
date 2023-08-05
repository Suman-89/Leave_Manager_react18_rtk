/* eslint-disable prettier/prettier */
import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput, CFormSwitch, CInputGroup, CInputGroupText, CModal, CModalBody, CModalHeader, CModalTitle, CRow, CSpinner } from '@coreui/react'
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
 
  //view modal //
  const [openModal, setOpenModal] = useState(false)
  const [viewDetails,setViewDetails] = useState({})

  // console.log('userInfo:', userInfo)

  const handleSearch = async () => {
    try {
      const sData = await API.get(`/wp-jwt/v1/apply-leave-details`)
      console.log('sData:', sData.data.data)
      setFilteredUserInfo(sData.data.data.reverse())
    } catch (err) {
      console.log('error:', err)
    }
  }

  useEffect(() => {
    handleSearch()
    dispatch(MyDetailsAction())
  }, [])

  useEffect(() => {
    const searchResult = userInfo.filter((userResult) => {
      return userResult.display_name.toLowerCase().match(searchItem.toLowerCase())
    })
    setFilteredUserInfo(searchResult)
  }, [searchItem])

  const viewClick = (data) => {
    console.log('vId data:', data)
    setViewDetails(data)
    setOpenModal(true)
  }
 

  const StartDate = ({ row }) => moment(row).format('DD-MMM-YYYY')
  const EndDate = ({ row }) => moment(row).format('DD-MMM-YYYY')


  const columns = [
    {
      name: 'Sl. No.',
      selector: (row, index) => <p>{index + 1}.</p>
    },
    {
      name: 'Project Manager',
      selector: (row) => row.display_name,
      sortable: true
    },
    {
      name: 'Department',
      selector: (row) => row.dept_name,
      sortable: true
    },
    {
      name: 'Start Date',
      // selector: (row) => row.start_date,
      cell: (sdRow) => <StartDate row={sdRow.start_date} />,
      sortable: true
    },
    {
      name: 'End Date',
      // selector: (row) => row.end_date,
      cell: (edRow) => <EndDate row={edRow.end_date} />,
      sortable: true
    },
    {
      name: 'Status',
      cell: (row) =>
        <CButton
          color={
            row.status === "0" ? 'warning'
              : row.status === "1" ? 'success'
                : row.status === "2" ? 'danger'
                  : row.status === "3" ? 'primary'
                    : row.status === "4" ? 'info'
                      : row.status === "5" ? 'secondary' : ''}

          shape="rounded-0"
          size='sm'
          readOnly
          style={{ width: '100%', cursor: 'text' }}
        >
          {row.status === "0" ? 'Pending'
            : row.status === "1" ? 'Approved'
              : row.status === "2" ? 'Rejected'
                : row.status === "3" ? 'On Hold'
                  : row.status === "4" ? 'Modified'
                    : row.status === "5" ? 'Cancelled' : ''}
        </CButton>,
    },
    {
      name: 'View/Chat',
      cell: (row) => <div className='col' style={{ margin: '0 auto' }}>
        <CButton className='rounded-pill' onClick={() => viewClick(row)}>
          <i className='fa fa-eye'></i></CButton>&nbsp;
        
        <CButton color='success' className='rounded-pill'
        >
          <i className="far fa-comment-dots fa-md" style={{ color: '#fff' }}></i>
        </CButton></div>
    },
    {
      name: 'Action',
      cell: (row) => <CFormSwitch size="lg"/>
    },
  ]
  return (
    <>
     <CModal alignment="center" size="sm" visible={openModal} onClose={() => setOpenModal(false)}>
          <CModalHeader>
            <CModalTitle>Leave Details</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <span>status : <h2 className='display-7'>
            {viewDetails.status === "0" ? 'Pending'
            : viewDetails.status === "1" ? 'Approved'
              : viewDetails.status === "2" ? 'Rejected'
                : viewDetails.status === "3" ? 'On Hold'
                  : viewDetails.status === "4" ? 'Modified'
                    : viewDetails.status === "5" ? 'Cancelled' : ''}
              </h2></span>
            <CInputGroup size="sm" className="mb-3">
              <CForm className="row g-3">
                <CCol md={6}>
                  <CFormInput type="text" label="Start Date" value={viewDetails.start_date} readOnly />
                </CCol>
                <CCol md={6}>
                  <CFormInput type="text" label="End Date" value={viewDetails.end_date} readOnly />
                </CCol>
              </CForm>
            </CInputGroup>
            <CInputGroup size="sm" className="mb-3">
              <CInputGroupText id="basic-addon1">Department</CInputGroupText>
              <CFormInput type="text" value={viewDetails.dept_name} readOnly />
            </CInputGroup>
            <CInputGroup size="sm" className="mb-3">
              <CInputGroupText id="basic-addon1">Reason</CInputGroupText>
              <CFormInput type="text" value={viewDetails.reason} readOnly />
            </CInputGroup>
            <CInputGroup size="sm" className="mb-3">
              <CInputGroupText id="basic-addon1">Supervisor</CInputGroupText>
              <CFormInput type="text" value={viewDetails.display_name} readOnly />
            </CInputGroup>
          </CModalBody>
        </CModal> 
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Leave Application Details</strong>
            </CCardHeader>
            <CCardBody>
              {
                isLoading === true ? (
                  <CSpinner color="secondary" />
                ) : (
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
                          onChange={(e) => setSearchItem(e.target.value)}
                        />
                        <CButton className='mx-2 col-2' color="primary" onClick={() => setSearchItem('')} >Reset</CButton>
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
