import React, { useEffect } from 'react'
import axios from "axios"
import {useNavigate} from 'react-router-dom'

const CaptainLogout = () => {

    const navigate = useNavigate()
    const token= localStorage.getItem('token')

        useEffect(() => {
            axios.get(import.meta.env.VITE_BACKEND_URL + '/captains/logout',{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }).then((response)=>{
                if (response.status===200){
                    localStorage.removeItem('token')
                    navigate("/captain-login")
                }
            })
        }, [token])
        
   




  return (
    <div>CaptainLogout</div>
  )
}

export default CaptainLogout