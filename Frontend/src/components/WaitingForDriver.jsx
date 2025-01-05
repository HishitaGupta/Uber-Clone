import React from 'react'
import { FaUser } from 'react-icons/fa'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

const WaitingForDriver = ({ waitingForDriver, setWaitingForDriver,ride }) => {
    return (
        <div>
            <div className='flex justify-between'>
                <h2 className="text-xl font-semibold mb-2 flex justify-between items-center">Meet at the pickup point
                    <MdOutlineKeyboardArrowDown
                        className={`absolute right-4 top-4 text-xl cursor-pointer  ${waitingForDriver === true ? '' : 'rotate-180'}`}
                        onClick={() => (setWaitingForDriver(!waitingForDriver))} // Close panel on click
                    />
                </h2>
                <p className='w-10 h-full text-white bg-black text-center text-sm font-semibold m-2 p-1'>2 <br />min
                </p>
                <hr />
            </div>

            <hr />

            <div className='w-full flex justify-between py-4'>
                <div className='flex relative  p-2'>
                    <img src="https://th.bing.com/th/id/OIP.Jt-Lq3dlYNFffLlwYAijLAHaHa?rs=1&pid=ImgDetMain" alt="" className=' h-20 w-20 rounded-full' />
                    <img src="https://clipground.com/images/uber-car-png-1.png" alt="" className='rounded-full h-20  absolute  left-16 flex justify-center items-center z-11 object-center' />
                </div>

                <div className='flex flex-col justify-center px-2'>
                    <h4 className="text-md flex justify-between text-gray-800">{`${ride?.captain?.fullname.firstname}`}</h4>
                    <h1 className='text-2xl font-semibold'>{`${ride?.captain?.vehicle.plate}`}</h1>
                    <h5 className="text-sm text-gray-600 flex justify-between">{`${ride?.captain?.vehicle.color}`+` `+`${ride?.captain?.vehicle.vehicleType}`}</h5>
                    <h1>{ride?.otp}</h1>

                </div>
            </div>

            <hr />

            <div className="flex flex-col justify-between items-center active:border-black p-4 border rounded-xl">
                {/* <div className=" flex justify-center items-center ">
            <img src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" className="object-center" /></div> */}
                <div className="flex flex-col p-2 w-full gap-2">

                    <h4 className="text-xl font-bold flex justify-between">Location </h4>
                    <p className='text-md text-gray-400'>{ride?.pickup}</p>
                    <hr />

                </div>

                <div className="flex flex-col p-2 w-full gap-2">

                    <h4 className="text-xl font-bold flex justify-between">Destination </h4>
                    <p className='text-md text-gray-400'>{ride?.destination}</p>
                    <hr />

                </div>

                <div className="flex flex-col p-2 w-full gap-2">

                    <h4 className="text-xl font-bold flex justify-between">Payment </h4>
                    <p className='text-md text-gray-400'>{ride?.fare}</p>


                </div>

                {/* <button className='w-full px-8 py-2 bg-black text-white font-semibold text-md rounded-lg m'>Confirm Ride</button>
           */}

            </div>

        </div>
    )
}

export default WaitingForDriver