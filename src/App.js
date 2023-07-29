/* eslint-disable react/prop-types */
/* eslint-disable react/no-children-prop */
import React, { Component, Suspense } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

function PrivateRoute({ children }) {
  const empData = localStorage.getItem('userLogData')
  console.log('empData:', empData)
  return empData != null ? (
    <>{children}</>
  ) : (
    <>
      <Navigate to={'/login'} />
    </>
  )
}
function PublicRoute({ children }) {
  const empData = localStorage.getItem('userLogData')
  console.log('empData:', empData)
  return empData === null ? (
    <>{children}</>
  ) : (
    <>
      <Navigate to={'/'} />
    </>
  )
}

function App() {
  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route
            exact
            path="/login"
            name="Login Page"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/register"
            name="Register Page"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/404"
            name="Page 404"
            element={
              <PublicRoute>
                <Page404 />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/500"
            name="Page 500"
            element={
              <PublicRoute>
                <Page500 />
              </PublicRoute>
            }
          />
          <Route
            path="*"
            name="Home"
            element={
              <PrivateRoute>
                <DefaultLayout />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

// class App extends Component {
//   render() {
//     return (

//     )
//   }
// }

export default App
