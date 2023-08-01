/* eslint-disable prettier/prettier */
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { managerNameAction } from 'src/redux/action/managerNameAction'

const ManagerName = () => {
  const dispatch = useDispatch()
  const { manager } = useSelector((state) => state.managerName)

  useEffect(() => {
    dispatch(managerNameAction())
  }, [])
  return (
    <>
      <CDropdown>
        <CDropdownToggle color="light"> Select option </CDropdownToggle>
        {manager.map((data, index) => (
          <CDropdownMenu key={index}>
            <CDropdownItem href="#">{data.name}</CDropdownItem>
          </CDropdownMenu>
        ))}
      </CDropdown>
    </>
  )
}

export default ManagerName
