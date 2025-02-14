import React, { useContext, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import {UserDataContext }from '../context/UserContext'

const UserSignUp = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [userData, setUserData] = useState({})
  const{user,setUser}=useContext(UserDataContext)
  const navigate = useNavigate()


  const onSubmitHandler = async(e) => {
    e.preventDefault()

    const newUser={
      fullname: {
        firstname: firstName,
        lastname: lastName
      },

      email: email,
      password: password,
    }
    const response  = await axios.post(import.meta.env.VITE_BACKEND_URL+'/users/register',newUser)

    if(response.status===201){
      const data = response.data
      setUser(data.user)
      localStorage.setItem('token',data.token)
    
      navigate('/home')
    }

    // console.log(userData);
    setFirstName("")
    setLastName("")
    setEmail("")
    setPassword("")

  }




  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img src="https://logospng.org/download/uber/logo-uber-4096.png" alt="" className='w-20 ' />
        <form action="" onSubmit={onSubmitHandler}>
          <div className='flex gap-5'>
            <div className='w-1/2'>
              <h3 className='text-xl mb-2 '>Firstname</h3>
              <input className='bg-[#EEEE] rounded px-4 py-2 border mb-7 w-full text-lg placeholder:text-base'
                type="text" required placeholder=''
                onChange={(e) => (setFirstName(e.target.value)
                )} value={firstName} /></div>
            <div className='w-1/2'>
              <h3 className='text-xl mb-2 '>Lastname</h3>
              <input className='bg-[#EEEE] rounded px-4 py-2 border mb-7 w-full text-lg placeholder:text-base'
                type="text" required placeholder=''
                onChange={(e) => (setLastName(e.target.value)
                )} value={lastName} />
            </div>
          </div>

          <h3 className='text-xl mb-2 '>Email?</h3>
          <input className='bg-[#EEEE] rounded px-4 py-2 border mb-7 w-full text-lg placeholder:text-base'
            type="email" required placeholder='email@example.com'
            onChange={(e) => (setEmail(e.target.value)
            )} value={email} />
          <h3 className='text-xl mb-2 '>Password</h3>
          <input type="password" required placeholder='******' className='bg-[#EEEE] rounded px-4 py-2 border mb-7 w-full text-lg placeholder:text-base' onChange={(e) => (setPassword(e.target.value)
          )} value={password} />
          <button className='bg-[#111] text-white font-semibold rounded px-4 py-2 border mb-7 w-full text-lg '>Create Account</button>
          <p className='text-center mb-1'>Existing User? <Link to="/login" className='text-blue-600'>Login here</Link></p>
        </form>
      </div>
      <div>
        <Link to="/captain-login" className='flex w-full bg-lime-500 text-white py-2 rounded text-lg  items-center font-semibold justify-center'>Sign Up as Captain</Link>
      </div>
    </div>
  )
}

export default UserSignUp