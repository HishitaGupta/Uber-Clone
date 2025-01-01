import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainSignUp = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [vehicleColor, setVehicleColor] = useState("")
  const [vehiclePlate, setVehiclePlate] = useState("")
  const [vehicleType, setVehicleType] = useState("")
  const [vehicleCapacity, setVehicleCapacity] = useState("")


  const { captain, setCaptain } = useContext(CaptainDataContext)

  const navigate = useNavigate()

  const onSubmitHandler = async(e) => {
    e.preventDefault()

    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },

      email: email,
      password: password,

      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        vehicleType: vehicleType,
        capacity: vehicleCapacity
      }
    }
    // console.log(captainData);
    
    const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/captains/register', captainData)

    if(response.status===201){
      const data = response.data
      // console.log(response);
      
      setCaptain(data.captain)
      localStorage.setItem('token',data.token)
    
      navigate('/captain-home')
    }
    // console.log(userData);
    setFirstName("")
    setLastName("")
    setEmail("")
    setPassword("")
    setVehicleCapacity("")
    setVehicleColor("")
    setVehiclePlate("")
    setVehicleType("")

  }




  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div>
        <img src="https://static.vecteezy.com/system/resources/previews/027/127/501/original/uber-logo-uber-icon-transparent-free-png.png" alt="" className='w-20 ' />
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
          <div className='flex gap-5'>
            <div className='w-1/2'>
              <h3 className='text-xl mb-2 '>Vehicle Color</h3>
              <input className='bg-[#EEEE] rounded px-4 py-2 border mb-7 w-full text-lg placeholder:text-base'
                type="text" required placeholder=''
                onChange={(e) => (setVehicleColor(e.target.value)
                )} value={vehicleColor} /></div>
            <div className='w-1/2'>
              <h3 className='text-xl mb-2 '>Vehicle Plate</h3>
              <input className='bg-[#EEEE] rounded px-4 py-2 border mb-7 w-full text-lg placeholder:text-base'
                type="text" required placeholder=''
                onChange={(e) => (setVehiclePlate(e.target.value)
                )} value={vehiclePlate} />
            </div>
          </div>

          <div className='flex gap-5'>
            <div className='w-1/2'>
              <h3 className='text-xl mb-2 '>Vehicle Type</h3>
              {/* <input className='bg-[#EEEE] rounded px-4 py-2 border mb-7 w-full text-lg placeholder:text-base'
                type="text" required placeholder=''
                onChange={(e) => (setVehicleColor(e.target.value)
                )} value={vehicleColor} /> */}

              <select className='bg-[#EEEE] rounded px-4 py-2 border mb-7 w-full text-lg placeholder:text-base' onChange={(e) => (setVehicleType(e.target.value))} defaultValue="car">
                <option value="car">Car</option>
                <option value="motorcycle">Motorcycle</option>
                <option value="auto">Auto</option>
              </select>
            </div>
            <div className='w-1/2'>
              <h3 className='text-xl mb-2 '>Vehicle Capacity</h3>
              <input className='bg-[#EEEE] rounded px-4 py-2 border mb-7 w-full text-lg placeholder:text-base'
                type="number" required placeholder=''
                onChange={(e) => (setVehicleCapacity(e.target.value)
                )} value={vehicleCapacity} />
            </div>
          </div>

          <button className='bg-[#111] text-white font-semibold rounded px-4 py-2 border mb-7 w-full text-lg '>Sign Up</button>
          <p className='text-center mb-1'>Existing Captain? <Link to="/captain-login" className='text-blue-600'>Login here</Link></p>


        </form>
      </div>
      <div>
        <Link to="/signup" className='flex w-full bg-lime-500 text-white py-2 rounded text-lg  items-center font-semibold justify-center'>Sign Up as User</Link>
      </div>
    </div>
  )
}

export default CaptainSignUp