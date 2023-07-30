import {
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
  CInputGroupText,
  CRow,
  CWidgetStatsA,
} from '@coreui/react'
import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CIcon from '@coreui/icons-react'
import { cilLightbulb, cilLockLocked, cilSpeedometer } from '@coreui/icons'

const LeaveApply = () => {
  const [startdate, setStartDate] = useState(new Date())
  const [lastdate, setLastDate] = useState(new Date())

  const [value, setValue] = useState('')

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>React Form Control</strong>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={4}>
                  <CWidgetStatsA
                    className="mb-4"
                    color="success"
                    inverse
                    value="21"
                    title="Casual leaves"
                  />
                </CCol>
                <CCol xs={4}>
                  <CWidgetStatsA
                    className="mb-4"
                    color="info"
                    inverse
                    value="72"
                    title="Sick leaves"
                  />
                </CCol>

                <CCol xs={4}>
                  <CWidgetStatsA
                    className="mb-4"
                    color="primary"
                    inverse
                    value="69"
                    title="Earned leaves"
                  />
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Leave Application of Rahul Kumar</strong>
            </CCardHeader>
            <CCardBody>
              <CForm>
                <div className="row mb-3">
                  <div className="col-md-4">
                    <CFormLabel htmlFor="exampleFormControlInput1">Start Date :</CFormLabel>
                    <br />
                    <DatePicker onChange={(e) => setStartDate(e)} selected={startdate} />
                  </div>
                  <div className="col-md-4">
                    <CFormLabel htmlFor="exampleFormControlInput1">End Date : </CFormLabel>
                    <br />
                    <DatePicker onChange={(e) => setLastDate(e)} selected={lastdate} />
                  </div>
                  <div className="col-md-4">
                    <CFormLabel htmlFor="exampleFormControlInput1">
                      Project Manager/Superior
                    </CFormLabel>
                    <br />
                    <CDropdown>
                      <CDropdownToggle color="light"> Select option </CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem href="#">Prabhat Kanti Pandit</CDropdownItem>
                        <CDropdownItem href="#">Sehbaz Khan</CDropdownItem>
                        <CDropdownItem href="#">Daniel Atwood</CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                  </div>
                </div>

                <div className="mb-3">
                  <CFormLabel htmlFor="exampleFormControlTextarea1">Reason to Leave</CFormLabel>
                  {/* <CFormTextarea id="exampleFormControlTextarea1" rows="3"></CFormTextarea> */}
                  <ReactQuill
                    placeholder="Type reason here"
                    theme="snow"
                    value={value}
                    onChange={setValue}
                  />
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default LeaveApply
