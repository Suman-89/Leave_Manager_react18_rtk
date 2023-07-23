import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  // const [passIn, setPassIn] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)

  const navigate = useNavigate()

  // const handlePass = () => {
  //   // if (showPass === true) {
  //   //   setShowPass(false)
  //   // }
  //   setShowPass(true)
  // }
  // const handlePassHide = () => {
  //   setShowPass(false)
  // }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Enter username" autoComplete="username" />
                  </CInputGroup>

                  <CRow xs={6}>
                    <CCol>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput placeholder="Firstname" autoComplete="firstname" />
                      </CInputGroup>
                    </CCol>
                    <CCol>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput placeholder="Lastname" autoComplete="lastname" />
                      </CInputGroup>
                    </CCol>
                  </CRow>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Enter email" autoComplete="email" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type={showPass === true ? 'text' : 'password'}
                      placeholder="Enter password"
                      autoComplete="new-password"
                      className="form-control"
                      style={{ borderRightColor: '#fff' }}
                    />

                    <CInputGroupText style={{ backgroundColor: '#fff' }}>
                      {/* <CIcon icon={cilLowVision} /> */}
                      {showPass === true ? (
                        <i
                          className="fa fa-eye"
                          style={{ backgroundColor: '#fff' }}
                          onClick={() => setShowPass(false)}
                        ></i>
                      ) : (
                        <i
                          className="fa fa-eye-slash"
                          style={{ backgroundColor: '#fff' }}
                          onClick={() => setShowPass(true)}
                        ></i>
                      )}
                    </CInputGroupText>
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type={showConfirmPass === true ? 'text' : 'password'}
                      placeholder="Repeat password"
                      autoComplete="repeat-password"
                      style={{ borderRightColor: '#fff' }}
                    />

                    <CInputGroupText style={{ backgroundColor: '#fff' }}>
                      {/* <CIcon icon={cilLowVision} /> */}
                      {showConfirmPass === true ? (
                        <i
                          className="fa fa-eye"
                          style={{ backgroundColor: '#fff' }}
                          onClick={() => setShowConfirmPass(false)}
                        ></i>
                      ) : (
                        <i
                          className="fa fa-eye-slash"
                          style={{ backgroundColor: '#fff' }}
                          onClick={() => setShowConfirmPass(true)}
                        ></i>
                      )}
                    </CInputGroupText>
                  </CInputGroup>
                  <CRow>
                    <CCol xs={6}>
                      <CButton color="success" className="px-4">
                        Create Account
                      </CButton>
                    </CCol>
                    <CCol xs={6}>
                      <span>Already have an account</span>
                      {/* <CButton color="link" className="px-0">
                        Forgot password?
                      </CButton> */}
                    </CCol>
                  </CRow>
                  <CRow>
                    <CButton
                      color="link"
                      className="mx-0"
                      style={{ paddingLeft: '95px' }}
                      onClick={() => navigate('/login')}
                    >
                      Sign in
                    </CButton>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
