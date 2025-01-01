import React, { useState,useContext } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [captain,setCaptain]=useState({})
  const navigate = useNavigate()

  const onSubmitHandler =async(e)=>{
    e.preventDefault()
    
  const captainData ={
      email:email,
      password:password,
    }

    const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/captains/login', captainData)

    if(response.status===200){
      const data = response.data
      console.log(data);
      setCaptain(data.captain)
      localStorage.setItem('token',data.token)
      navigate('/captain-home')
    }
    console.log(captainData);
    setEmail("")
    setPassword("")
    
  }




  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img src="https://static.vecteezy.com/system/resources/previews/027/127/501/original/uber-logo-uber-icon-transparent-free-png.png" alt="" className='w-20 ' />
        <form action="" onSubmit={onSubmitHandler}>
          <h3 className='text-xl mb-2 '>What's your email?</h3>
          <input className='bg-[#EEEE] rounded px-4 py-2 border mb-7 w-full text-lg placeholder:text-base'
            type="email" required placeholder='email@example.com'
            onChange={(e) => (setEmail(e.target.value)
            )} value={email}/>
          <h3 className='text-xl mb-2 '>Enter Password</h3>
          <input type="password" required placeholder='******' className='bg-[#EEEE] rounded px-4 py-2 border mb-7 w-full text-lg placeholder:text-base' onChange={(e)=>(setPassword(e.target.value) 
      )} value={password}/>
          <button className='bg-[#111] text-white font-semibold rounded px-4 py-2 border mb-7 w-full text-lg '>Login</button>
          <p className='text-center mb-1'>Join a Fleet? <Link to="/captain-signup" className='text-blue-600'>Register as a Captain</Link></p>
        </form>
      </div>
      <div>
        <Link to="/login" className='flex w-full bg-orange-400 text-white py-2 rounded text-lg  items-center font-semibold justify-center'>Sign In as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin