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
import { useDispatch } from 'react-redux'
import { empRegister } from 'src/action/reduxAction'
// import { rootApi } from 'src/RootApi'

const Register = () => {
  const [showPass, setShowPass] = useState(false)
  const [showConfirmPass, setShowConfirmPass] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [registerNew, setRegisterNew] = useState({
    empUsername: '',
    empFirstName: '',
    empLastName: '',
    empEmail: '',
    empPassword: '',
    empConfPassword: '',
  })
  const [message, setMessage] = useState('')
  const [passErr, setPassErr] = useState('')
  const [errStatus, setErrStatus] = useState(false)

  const createAccount = () => {
    if (
      !registerNew.empUsername ||
      !registerNew.empFirstName ||
      !registerNew.empLastName ||
      !registerNew.empEmail ||
      !registerNew.empPassword ||
      !registerNew.empConfPassword
    ) {
      setErrStatus(true)
      setMessage('Please fill all fields *')
      setTimeout(() => {
        setErrStatus(false)
        setMessage('')
      }, 2000)
    } else if (registerNew.empPassword !== registerNew.empConfPassword) {
      setErrStatus(true)
      setPassErr('Password does not match*')
      setTimeout(() => {
        setErrStatus(false)
        setPassErr('')
      }, 2000)
    } else {
      const newEmployee = {
        username: registerNew.empUsername,
        first_name: registerNew.empFirstName,
        last_name: registerNew.empLastName,
        email: registerNew.empEmail,
        password: registerNew.empPassword,
        confirm_password: registerNew.empConfPassword,
      }
      // rootApi
      //   .post(`/create-new-user`, newEmployee)
      //   .then((res) => {
      //     console.log('res:', res)
      //   })
      //   .catch((err) => {
      //     console.log('err:', err)
      //   })
      dispatch(empRegister(newEmployee))
        .then((response) => {
          console.log('response:', response)
          if (response?.meta?.requestStatus === 'fulfilled') {
            setErrStatus(false)
            setMessage('Registered successfully !')
            setPassErr('Password matched !')
            setTimeout(() => {
              setMessage('')
              setPassErr('')
              setRegisterNew({
                empUsername: '',
                empFirstName: '',
                empLastName: '',
                empEmail: '',
                empPassword: '',
                empConfPassword: '',
              })
              navigate('/')
            }, 2000)
          }
        })
        .catch((err) => {
          console.log('err:', err)
        })
    }
  }

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
                    <CFormInput
                      placeholder="Enter username"
                      autoComplete="username"
                      value={registerNew.empUsername}
                      onChange={(evt) =>
                        setRegisterNew({ ...registerNew, empUsername: evt.target.value })
                      }
                    />
                  </CInputGroup>

                  <CRow xs={6}>
                    <CCol>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Firstname"
                          autoComplete="firstname"
                          value={registerNew.empFirstName}
                          onChange={(evt) =>
                            setRegisterNew({ ...registerNew, empFirstName: evt.target.value })
                          }
                        />
                      </CInputGroup>
                    </CCol>
                    <CCol>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          placeholder="Lastname"
                          autoComplete="lastname"
                          value={registerNew.empLastName}
                          onChange={(evt) =>
                            setRegisterNew({ ...registerNew, empLastName: evt.target.value })
                          }
                        />
                      </CInputGroup>
                    </CCol>
                  </CRow>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Enter email"
                      autoComplete="email"
                      value={registerNew.empEmail}
                      onChange={(evt) =>
                        setRegisterNew({ ...registerNew, empEmail: evt.target.value })
                      }
                    />
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
                      value={registerNew.empPassword}
                      onChange={(evt) =>
                        setRegisterNew({ ...registerNew, empPassword: evt.target.value })
                      }
                    />

                    <CInputGroupText style={{ backgroundColor: '#fff' }}>
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
                      value={registerNew.empConfPassword}
                      onChange={(evt) =>
                        setRegisterNew({ ...registerNew, empConfPassword: evt.target.value })
                      }
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
                  {passErr ? (
                    <span
                      style={{ color: errStatus === true ? 'red' : 'green', textAlign: 'center' }}
                    >
                      {passErr}
                    </span>
                  ) : (
                    <></>
                  )}
                  <CRow>
                    <CCol xs={6}>
                      <CButton color="success" className="px-4" onClick={() => createAccount()}>
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
                      onClick={() => navigate('/')}
                    >
                      Sign in
                    </CButton>
                  </CRow>
                </CForm>
              </CCardBody>
              {message ? (
                <span style={{ color: errStatus === true ? 'red' : 'green', textAlign: 'center' }}>
                  {message}
                </span>
              ) : (
                <></>
              )}
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
