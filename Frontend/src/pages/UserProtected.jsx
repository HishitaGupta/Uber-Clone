import React, { useEffect } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router'

const UserProtected = ({children}) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }

    },[])
    



  return (
    <div>{children}</div>
  )
}

export default UserProtected