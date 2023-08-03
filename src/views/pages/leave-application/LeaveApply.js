/* eslint-disable prettier/prettier */
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormLabel,
  CRow,
  CSpinner,
  CWidgetStatsA,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import JoditEditor from 'jodit-react'
import { useDispatch, useSelector } from 'react-redux'
import { assignedLeavesAction } from 'src/redux/action/assignedLeavesAction'
import { managerNameAction } from 'src/redux/action/managerNameAction'
import { ApplyLeaveAction } from 'src/redux/action/applyLeaveAction'


const LeaveApply = () => {
  const dispatch = useDispatch()
  const { leaves, loading } = useSelector((state) => state.leaves)
  const { managerList } = useSelector((state) => state.managerName)

  // console.log('managerList:', managerList)

  //employe Leave data //
  const [leaveData, setLeaveData] = useState({
    leaveStartDate: "",
    leaveEndDate: "",
    superiorId: "",
    reason: ""
  })
  const [message, setMessage] = useState('')
  const [errorStatus, setErrorStatus] = useState(false)

  useEffect(() => {
    dispatch(assignedLeavesAction())
    dispatch(managerNameAction())
  }, [])

  //submit leave 
  const applyLeave = (e) => {
    e.preventDefault()
    if (
      !leaveData.reason ||
      !leaveData.leaveStartDate ||
      !leaveData.leaveEndDate ||
      !leaveData.superiorId) {
      setErrorStatus(true)
      setMessage('Please fullfill all info !')
      setTimeout(() => {
        setErrorStatus(false)
        setMessage('')
      }, 2000)
    } else {
      const applyLeaveData = {
        reason: leaveData.reason,
        superior_user_id: leaveData.superiorId,
        start_date: leaveData.leaveStartDate,
        end_date: leaveData.leaveEndDate
      }
      console.log('applyLeaveData:', applyLeaveData)
      dispatch(ApplyLeaveAction(applyLeaveData)).then((res) => {
        console.log('res =', res)
        if (res.meta.requestStatus === "fulfilled") {
          setErrorStatus(false)
          setMessage('Leave applied successfully !')
          setTimeout(() => {
            setErrorStatus(false)
            setMessage('')
            setLeaveData({
              leaveStartDate: "",
              leaveEndDate: "",
              superiorId: "",
              reason: ""
            })
          }, 2000)
        }
      }).catch((err) => {
        console.log('err =', err)
      })
    }
  }
  // console.log('leaveData.leaveStartDate', leaveData.leaveStartDate, typeof leaveData.leaveStartDate)
  // console.log('leaveData.leaveEndDate', leaveData.leaveEndDate, typeof leaveData.leaveEndDate)


  return (
    <>
      {loading === true ? (
        <CSpinner color="secondary" className="my-3" />
      ) : (
        <>
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
          {/*Apply leave application start*/}
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
                            onChange={(e) => setLeaveData({ ...leaveData, leaveStartDate: e.target.value })
                            }
                            style={{ width: '100%' }}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <CFormLabel htmlFor="exampleFormControlInput1">End Date : </CFormLabel>
                        <br />
                        <div className="rainbow-m-around_small">
                          <input type='date' placeholder='dd/mm/yyyy' value={leaveData.leaveEndDate}
                            onChange={(e) => setLeaveData({ ...leaveData, leaveEndDate: e.target.value })
                            }
                            style={{ width: '100%' }}
                          />
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
                          onChange={(e) => setLeaveData({ ...leaveData, superiorId: e.target.value })}

                          style={{ width: '100%', height: '46%' }}
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
                          console.log('e text', e)
                          setLeaveData({ ...leaveData, reason: e })
                        }
                        }
                      />
                    </div>
                    <div className="row">
                      <CCol xs={12}>
                        <CButton color="primary" type="submit">
                          Submit
                        </CButton>
                        {message ? (<CAlert color={errorStatus === true ? 'danger' : 'success'} style={{ width: '40%', margin: '0 auto 0', textAlign: 'center' }} >
                          {message}
                          </CAlert>) : (<></>)}
                      </CCol>
                    </div>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
          {/*Apply leave application end*/}
        </>
      )}
    </>
  )
}

export default LeaveApply
