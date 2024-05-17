import React, { useEffect, useState } from 'react'
import {Outlet, Navigate, useNavigate} from 'react-router-dom'

const PubManagerRoute = ({loggedInUser, setLogggedInUser}) => {
  const navigate = useNavigate()
  const [userType, setUserType] = useState('MANAGER')
  const loggedInType = loggedInUser?.userType
  useEffect(()=> {
    if (!loggedInUser && (loggedInUser && loggedInUser.userType !== 'MANAGER')) {
      navigate('/login')
      setLogggedInUser(null)
    }else {
      setLogggedInUser(loggedInUser)
    }
    console.log('type',loggedInUser?.userType)
  },[])
  return loggedInType === userType ? <Outlet /> : <Navigate to={"/affiliates/manager/dashboard"} />
  
}

export default PubManagerRoute