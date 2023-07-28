import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
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
import { useDispatch, useSelector } from 'react-redux'
import API from '../../../api'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [viewPass, setViewPass] = useState(false)
  //Login state defined
  const [userLoginState, setUserLoginState] = useState({
    empUserName: '',
    empPassword: '',
  })
  const [message, setMessage] = useState('')
  const [errStatus, setErrStatus] = useState(false)

  //Function defined
  const userLogin = (e) => {
    e.preventDefault()

    if (!userLoginState.empUserName || !userLoginState.empPassword) {
      setErrStatus(true)
      setMessage('Please fill all fields *')
      setTimeout(() => {
        setErrStatus(false)
        setMessage('')
      }, 2000)
    } else {
      const loginFormData = {
        username: userLoginState.empUserName,
        password: userLoginState.empPassword,
      }

      API.post('/jwt-auth/v1/token', loginFormData)
        .then((response) => {
          console.log('response-->', response)
          const userData = response.data
          localStorage.setItem('userLogData', JSON.stringify(userData))
        })
        .catch((err) => {
          console.log(err.response)
          const { status, data } = err.response
          if (status === 403) {
            setErrStatus(true)

            setMessage('Error! Login failed')
          }
          if (status === 404) {
            setErrStatus(true)

            setMessage('Error! Login failed')
          }
        })
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <div className="row m-3">
          <h1 style={{ textAlign: 'center' }}>Leave Management System</h1>
        </div>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={userLogin}>
                    <h1>Login</h1>
                    {message ? (
                      <span
                        style={{ color: errStatus === true ? 'red' : 'green', textAlign: 'center' }}
                      >
                        {message}
                      </span>
                    ) : (
                      <></>
                    )}
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        value={userLoginState.empUserName}
                        onChange={(e) =>
                          setUserLoginState({ ...userLoginState, empUserName: e.target.value })
                        }
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type={viewPass === true ? 'text' : 'password'}
                        placeholder="Password"
                        autoComplete="current-password"
                        style={{ borderRightColor: '#fff' }}
                        value={userLoginState.empPassword}
                        onChange={(e) =>
                          setUserLoginState({ ...userLoginState, empPassword: e.target.value })
                        }
                      />
                      <CInputGroupText style={{ backgroundColor: '#fff' }}>
                        {viewPass === true ? (
                          <i
                            className="fa fa-eye"
                            style={{ backgroundColor: '#fff' }}
                            onClick={() => setViewPass(false)}
                          ></i>
                        ) : (
                          <i
                            className="fa fa-eye-slash"
                            style={{ backgroundColor: '#fff' }}
                            onClick={() => setViewPass(true)}
                          ></i>
                        )}
                      </CInputGroupText>
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    {/* <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p> */}
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                        onClick={() => navigate('/register')}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
