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
import JoditEditor from 'jodit-react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import DatePicker from 'react-date-picker'
import { useDispatch, useSelector } from 'react-redux'
import { assignedLeavesAction } from 'src/redux/action/assignedLeavesAction'
import { managerNameAction } from 'src/redux/action/managerNameAction'
import API from '../../../api'


const LeaveApply = () => {
  const dispatch = useDispatch()
  const { leaves, loading } = useSelector((state) => state.leaves)
  const { managerList } = useSelector((state) => state.managerName)
  

  console.log('managerList:',managerList)
 
  //for manager name //
  // const [manager, setManager] = useState([])

  //employe Leave data //
  const [leaveData, setLeaveData] = useState({
    leaveStartDate: "",
    leaveEndDate: "",
    superiorId: "",
    reason: ""
  })
  // const [startDate,setStartDate] = useState([])
  // const [startDate,setStartDate] = useState()

  const [message, setMessage] = useState('')
  const [errorStatus, setErrorStatus] = useState(false)

  useEffect(() => {
    //manager name start//
    // API.get(`/wp-jwt/v1/employee-projectmanager-relation`).then((res) => {
    //   console.log('res:', res)
    //   if (res.status === 200) {
    //     setManager(res.data.data)
    //   }
    // }).catch((err) => {
    //   console.log('err:', err)
    // })
    //manager name end//

    dispatch(assignedLeavesAction())
    dispatch(managerNameAction())
  }, [])

  //submit leave 
  const applyLeave = (e) => {
    e.preventDefault()
    if (
      !leaveData.reason ||
      !leaveData.leaveStartDate||
      !leaveData.leaveEndDate||
      !leaveData.superiorId) {
      setErrorStatus(true)
      setMessage('Please fullfill all info !')
      setTimeout(() => {
        setErrorStatus(false)
        setMessage('')
      }, 2000)
    } else {
      const applyLeaveData = {
        reason :leaveData.reason,
        superior_user_id:leaveData.superiorId,
        start_date:leaveData.leaveStartDate,
        end_date:leaveData.leaveEndDate
      }
      console.log('applyLeaveData:',applyLeaveData)
      // setLeaveData(applyLeaveData)
      // setErrorStatus(false)
      // setMessage('Added successfully !')
      // setTimeout(() => {
      //   setErrorStatus(false)
      //   setMessage('')
      // }, 2000)
    }
  }
  console.log('leaveData.leaveStartDate',leaveData.leaveStartDate,typeof leaveData.leaveStartDate)
  console.log('leaveData.leaveEndDate',leaveData.leaveEndDate,typeof leaveData.leaveEndDate)


  return (
    <>
      {loading === true ? (
        <CSpinner color="secondary" className="my-3" />
      ) : (
        <>
          {message && errorStatus === true ? (<CAlert className='my-3' color={errorStatus === true ? 'danger' : 'success'} style={{ width: '40%', margin: '0 auto 0', textAlign: 'center' }} >{message}</CAlert>) : (<></>)}
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
                          inverse="true"
                          value={leaveData.casual_leave}
                          title="Casual leaves"
                        />
                      </CCol>
                      <CCol xs={4}>
                        <CWidgetStatsA
                          className="mb-4"
                          color="info"
                          inverse="true"
                          value={leaveData.sick_leave}
                          title="Sick leaves"
                        />
                      </CCol>

                      <CCol xs={4}>
                        <CWidgetStatsA
                          className="mb-4"
                          color="primary"
                          inverse="true"
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
                  <CForm onSubmit={applyLeave}>
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <CFormLabel htmlFor="exampleFormControlInput1">Start Date :</CFormLabel>
                        <br />
                        <div className="rainbow-m-around_small">
                          <input type='date' placeholder='dd/mm/yyyy' value={leaveData.leaveStartDate}
                           onChange={(e) => setLeaveData({...leaveData,leaveStartDate:e.target.value})
                          } 
                          style={{width:'100%'}}
                          />
                        {/* <DatePicker value={startDate} 
                        onChange={(e) => {
                          console.log('e start:',e, typeof e)
                          setStartDate(e.target.value)
                        } 
                      }
                        /> */}
                          {/* <DatePicker
                            formatStyle="medium"
                            placeholder='dd/mm/yyyy'
                            value={leaveData.leaveStartDate}
                            onChange={(e) => console.log('e start:',e, typeof e)
                              // setLeaveData({...leaveData,leaveStartDate:e.target.value})
                            }
                          /> */}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <CFormLabel htmlFor="exampleFormControlInput1">End Date : </CFormLabel>
                        <br />
                        <div className="rainbow-m-around_small">
                        <input type='date' placeholder='dd/mm/yyyy' value={leaveData.leaveEndDate}
                           onChange={(e) => setLeaveData({...leaveData,leaveEndDate:e.target.value})
                          } 
                          style={{width:'100%'}}
                          />
                          {/* <DatePicker
                            formatStyle="medium"
                            placeholder='dd/mm/yyyy'
                            value={leaveData.leaveEndDate}
                            onChange={(e) => 
                              setLeaveData({...leaveData,leaveEndDate:e.target.value})}
                          /> */}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <CFormLabel htmlFor="exampleFormControlInput1">
                          Project Manager/Superior
                        </CFormLabel>
                        <br />
                        {/* <ManagerName /> */}
                        <select name="managerlist" id="managerlist"
                        value={leaveData.superiorId}
                        onChange={(e) => setLeaveData({...leaveData,superiorId:e.target.value})}
        
                        style={{width:'100%',height:'46%'}}
                        >
                          <option value="">Select option</option>
                          {
                            managerList && managerList.map((data) => (
                          <option value={data.id} key={data.id}>{data.name}</option>
                            ))
                          }
                        </select>                       
                      </div>
                    </div>

                    <div className="mb-3">
                      <CFormLabel htmlFor="exampleFormControlTextarea1">Reason to Leave :</CFormLabel>
                      <JoditEditor 
                      className="mb-3"
                      placeholder="Type reason here"
                      value={leaveData.reason}
                        onChange={(e) => {
                          console.log('e text',e)
                          setLeaveData({...leaveData,reason:e})
                        }
                        }
                      />
                      {/* <ReactQuill
                        className="mb-3"
                        placeholder="Type reason here"
                        theme="snow"
                        value={leaveData.reason}
                        onChange={(e) => setLeaveData({...leaveData,reason:e.target.value})}
                      /> */}
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
