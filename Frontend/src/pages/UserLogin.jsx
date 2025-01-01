import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userData,setUserData]=useState({})

  const onSubmitHandler =(e)=>{
    e.preventDefault()
    
    setUserData({
      email:email,
      password:password,
    })
    console.log(userData);
    setEmail("")
    setPassword("")
    
  }




  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img src="https://logospng.org/download/uber/logo-uber-4096.png" alt="" className='w-20 ' />
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
          <p className='text-center mb-1'>New here? <Link to="/signup" className='text-blue-600'>Create new account</Link></p>
        </form>
      </div>
      <div>
        <Link to="/captain-login" className='flex w-full bg-lime-500 text-white py-2 rounded text-lg  items-center font-semibold justify-center'>Sign In as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin