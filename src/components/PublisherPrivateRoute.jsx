import React, { useEffect, useState } from 'react'
import {Outlet, Navigate, useNavigate} from 'react-router-dom'

const PublisherPrivateRoute = ({loggedInUser, setLogggedInUser}) => {
  const navigate = useNavigate()
  const [userType, setUserType] = useState('PUBLICHER')
  const loggedInType = loggedInUser?.userType
  useEffect(()=> {
    if (!loggedInUser && (loggedInUser && loggedInUser.userType !== 'PUBLICHER')) {
      navigate('/login')
      setLogggedInUser(null)
    }else {
      setLogggedInUser(loggedInUser)
    }
    console.log('type',loggedInUser?.userType)
  },[])
  return loggedInType === userType ? <Outlet /> : <Navigate to={"/login"} />
  
}

export default PublisherPrivateRoute