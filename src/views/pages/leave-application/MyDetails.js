/* eslint-disable prettier/prettier */
import { CCard, CCardBody, CCardHeader, CCol, CRow, CWidgetStatsA } from '@coreui/react'
import React from 'react'
import DataTable from 'react-data-table-component'

const MyDetails = () => {
  return (
    <>
       <CRow>
            <CCol xs={12}>
              <CCard className="mb-4">
                <CCardHeader>
                  <strong>Leave Application Details</strong>
                </CCardHeader>
                <CCardBody>
                   <DataTable/>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
    </>
  )
}

export default MyDetails
