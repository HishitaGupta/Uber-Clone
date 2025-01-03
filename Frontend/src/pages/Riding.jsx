import React from 'react'
import { FaHome } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Riding = () => {
    const navigate = useNavigate()
    return (
        <div className='h-screen'>
            <div className='w-10 h-10 bg-white rounded-full text-black text-lg fixed right-3 flex items-center justify-center mt-2'>
                <FaHome onClick={()=>(navigate("/home"))}/>
            </div>
            <div className='h-1/2 overflow-hidden'>
                <img
                    src="https://preview.redd.it/15jedtrp9u631.png?width=640&crop=smart&auto=webp&s=0ea0b6faf591210f9ad56c0e4cbebe177a242557"
                    alt=""
                    className="object-fit" />
            </div>
            <div className='h-1/2 p-2'>
            <div className='w-full flex justify-between py-4'>
                <div className='flex relative  p-2'>
                    <img src="https://th.bing.com/th/id/OIP.Jt-Lq3dlYNFffLlwYAijLAHaHa?rs=1&pid=ImgDetMain" alt="" className=' h-20 w-20 rounded-full' />
                    <img src="https://clipground.com/images/uber-car-png-1.png" alt="" className='rounded-full h-20  absolute  left-16 flex justify-center items-center z-11 object-center' />
                </div>

                <div className='flex flex-col justify-center px-2'>
                    <h4 className="text-md flex justify-between text-gray-800">Ramesh </h4>
                    <h1 className='text-2xl font-semibold'>PB11BX3361</h1>
                    <h5 className="text-sm text-gray-600 flex justify-between">White Espresso 500</h5>

                </div>
            </div>

            <hr />

            <div className="flex flex-col justify-between items-center active:border-black px-4 border rounded-xl">
                {/* <div className=" flex justify-center items-center ">
            <img src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" className="object-center" /></div> */}
                

                <div className="flex flex-col p-2 w-full gap-1">

                    <h4 className="text-lg font-bold flex justify-between">Destination </h4>
                    <p className='text-sm text-gray-400'>Destination</p>
                    <hr />

                </div>

                <div className="flex flex-col p-2 w-full gap-1">

                    <h4 className="text-lg font-bold flex justify-between">Payment </h4>
                    <p className='text-sm text-gray-400'>Payment Mode</p>


                </div>

                {/* <button className='w-full px-8 py-2 bg-black text-white font-semibold text-md rounded-lg m'>Confirm Ride</button>
           */}

            </div>
                <button className=' bg-[#111] text-white font-semibold rounded px-4 py-2 border w-full text-lg '>Make A Payment</button>
               
            </div>
        </div>

    )
}

export default Riding