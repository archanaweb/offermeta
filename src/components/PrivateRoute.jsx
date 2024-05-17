import React, { useEffect, useState } from 'react'
import {Outlet, Navigate, useNavigate} from 'react-router-dom'

const PrivateRoute = ({loggedInUser, setLogggedInUser}) => {
  const navigate = useNavigate()
  const [userType, setUserType] = useState('SUBADMIN')
  const loggedInType = loggedInUser?.userType
  useEffect(()=> {
    if (!loggedInUser && (loggedInUser && loggedInUser.userType !== 'SUBADMIN')) {
      navigate('/login')
      setLogggedInUser(null)
    }
    if(loggedInUser){
      setLogggedInUser(loggedInUser)
    }
    console.log('type',loggedInUser?.userType)
  },[])
  return loggedInType === userType ? <Outlet /> : <Navigate to={"/login"} />
  
}

export default PrivateRoute