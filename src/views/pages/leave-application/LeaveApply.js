/* eslint-disable prettier/prettier */
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CForm,
  CFormLabel,
  // CInputGroupText,
  CRow,
  CSpinner,
  CWidgetStatsA,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { DatePicker } from 'react-rainbow-components'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
// import CIcon from '@coreui/icons-react'
// import { cilLightbulb, cilLockLocked, cilSpeedometer } from '@coreui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { assignedLeavesAction } from 'src/redux/action/assignedLeavesAction'
// import ManagerName from './ManagerName'
// import { managerNameAction } from 'src/redux/action/managerNameAction'
import API from '../../../api'
import moment from 'moment'

const LeaveApply = () => {
  const dispatch = useDispatch()
  const { leaves, loading } = useSelector((state) => state.leaves)
  // const { manager } = useSelector((state) => state.managerName)

  //for qiell //
  const [value, setValue] = useState('')
  //for manager name //
  const [manager, setManager] = useState([])
  //employe Leave data //
  const [leaveData, setLeaveData] = useState({
    leaveStartDate: '',
    leaveEndDate: '',
    superiorId: '',
    reason: '',
  })
  const [message, setMessage] = useState('')
  const [errorStatus, setErrorStatus] = useState(false)

  useEffect(() => {
    //manager name start//
    API.get(`/wp-jwt/v1/employee-projectmanager-relation`)
      .then((res) => {
        console.log('res:', res)
        if (res.status === 200) {
          setManager(res.data.data)
        }
      })
      .catch((err) => {
        console.log('err:', err)
      })
    //manager name end//

    dispatch(assignedLeavesAction())
    // dispatch(managerNameAction())
  }, [])

  //submit leave
  const leaveSubmit = (e) => {
    e.preventDefault()
    if (
      !leaveData.leaveStartDate ||
      !leaveData.leaveEndDate ||
      !leaveData.reason ||
      !leaveData.superiorId
    ) {
      setErrorStatus(true)
      setMessage('Please fullfill all info !')
      setTimeout(() => {
        setErrorStatus(false)
        setMessage('')
      }, 2000)
    } else {
      setErrorStatus(false)
      setMessage('Added successfully !')
      setTimeout(() => {
        setErrorStatus(false)
        setMessage('')
      }, 2000)
    }
  }

  console.log(
    'leaveStartDate-->',
    leaveData.leaveStartDate,
    moment(leaveData.leaveStartDate).format('l'),
    moment(leaveData.leaveStartDate).format('YYYY-MM-DD'),
  )

  return (
    <>
      {loading === true ? (
        <CSpinner color="secondary" className="my-3" />
      ) : (
        <>
          {message ? (
            <CAlert
              className="my-3"
              color={errorStatus === true ? 'danger' : 'success'}
              style={{ width: '40%', margin: '0 auto 0', textAlign: 'center' }}
            >
              {message}
            </CAlert>
          ) : (
            <></>
          )}
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>Number of Leaves</strong>
                </CCardHeader>
                <CCardBody>
                  {leaves.map((leaveData, index) => (
                    <CRow key={index}>
                      <CCol xs={4}>
                        <CWidgetStatsA
                          className="mb-4"
                          color="success"
                          inverse={value.toString()}
                          value={leaveData.casual_leave}
                          title="Casual leaves"
                        />
                      </CCol>
                      <CCol xs={4}>
                        <CWidgetStatsA
                          className="mb-4"
                          color="info"
                          inverse={value.toString()}
                          value={leaveData.sick_leave}
                          title="Sick leaves"
                        />
                      </CCol>

                      <CCol xs={4}>
                        <CWidgetStatsA
                          className="mb-4"
                          color="primary"
                          inverse={value.toString()}
                          value={leaveData.earn_leave}
                          title="Earned leaves"
                        />
                      </CCol>
                    </CRow>
                  ))}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          {/*Apply leave application */}
          <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>Leave Application of Rahul Kumar</strong>
                </CCardHeader>
                <CCardBody>
                  <CForm onSubmit={leaveSubmit}>
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <CFormLabel htmlFor="exampleFormControlInput1">Start Date :</CFormLabel>
                        <br />
                        {/* <DatePicker onChange={(e) => setStartDate(e)} selected={startdate} /> */}
                        <div className="rainbow-m-around_small">
                          <DatePicker
                            formatStyle="medium"
                            placeholder="Start Date"
                            value={moment(leaveData.leaveStartDate).format('l')}
                            onChange={(e) => {
                              console.log('e-->', e)
                              setLeaveData({ ...leaveData, leaveStartDate: e })
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <CFormLabel htmlFor="exampleFormControlInput1">End Date : </CFormLabel>
                        <br />
                        <div className="rainbow-m-around_small">
                          <DatePicker
                            formatStyle="medium"
                            placeholder="End Date"
                            value={moment(leaveData.leaveEndDate).format('l')}
                            onChange={(e) => {
                              console.log('e-->', e)
                              setLeaveData({ ...leaveData, leaveEndDate: e })
                            }}
                          />
                        </div>
                        {/* <DatePicker onChange={(e) => setLastDate(e)} selected={lastdate} /> */}
                      </div>
                      <div className="col-md-4">
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Project Manager/Superior
                        </CFormLabel>
                        <br />
                        {/* <ManagerName /> */}
                        <CDropdown>
                          <CDropdownToggle color="outline-dark" shape="rounded-pill">
                            {' '}
                            Select option{' '}
                          </CDropdownToggle>
                          {manager.map((data) => (
                            <CDropdownMenu key={data.id}>
                              <CDropdownItem href="#">{data.name}</CDropdownItem>
                            </CDropdownMenu>
                          ))}
                        </CDropdown>
                      </div>
                    </div>

                    <div className="mb-3">
                      <CFormLabel htmlFor="exampleFormControlTextarea1">
                        Reason to Leave :
                      </CFormLabel>
                      {/* <CFormTextarea id="exampleFormControlTextarea1" rows="3"></CFormTextarea> */}
                      <ReactQuill
                        className="mb-3"
                        placeholder="Type reason here"
                        theme="snow"
                        value={value}
                        onChange={setValue}
                        // style={{height:'auto'}}
                      />
                    </div>
                    <div className="row">
                      <CCol xs={12}>
                        <CButton color="primary" type="submit">
                          Submit
                        </CButton>
                      </CCol>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </>
      )}
    </>
  )
}

export default LeaveApply
