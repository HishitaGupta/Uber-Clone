import React from 'react'
import {Link} from "react-router-dom"

const Home = () => {
  return (
    <div>
        <div className='bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)] bg-cover bg-center h-screen w-full flex items-start justify-between flex-col bg-red-400 pt-4  '>
          <img src="https://logospng.org/download/uber/logo-uber-4096.png" alt="" className='w-20 ml-8'/>
            <div className='bg-white py-5 pb-7 px-4 w-full'>
                <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
                <Link to="/login" className='flex w-full bg-black text-white py-3 rounded mt-5 items-center justify-center'>Continue</Link>
            </div>

        </div>
    </div>
  )
}

export default Home