import React, { useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

const UserProtected = ({children}) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const {user, setUser}= useContext(UserDataContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }

        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/users/profile`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                )
                // console.log(response);
                
                if (response.status === 200 && response.data!==null) {
                    setUser(response.data)
                    console.log("User in context:",response.data);
                    
                    setIsLoading(false)
                } else {
                    localStorage.removeItem('token')
                    navigate('/login')
                }
            } catch (error) {
                console.error(error)
                localStorage.removeItem('token')
                navigate('/login')
            }
        }

        fetchUserData();

    },[token,navigate,setUser])

    

    if(isLoading){ 
      return <div>Loading...</div>
    }

    
    



  return (
    <div>{children}</div>
  )
}

export default UserProtected