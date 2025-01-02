import React from 'react'
import { FaUser } from 'react-icons/fa'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

const LookingForDriver = ({lookingForDriver,setLookingForDriver}) => {
  return (
    <div>
        <h2 className="text-2xl font-semibold mb-2 flex justify-between">Looking For Driver
        <MdOutlineKeyboardArrowDown
            className={`absolute right-4 top-4 text-xl cursor-pointer ${lookingForDriver===true ? '' : 'rotate-180'}`}
            onClick={() => (setLookingForDriver(!lookingForDriver))} // Close panel on click
          />
        </h2>

        <div className="flex flex-col justify-between items-center active:border-black p-4 border rounded-xl">
          <div className=" flex justify-center items-center ">
            <img src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" className="object-center" /></div>
          <div className="flex flex-col p-2 w-full gap-2">
            
              <h4 className="text-xl font-bold flex justify-between">Location </h4>
              <p className='text-md text-gray-400'>location</p>
              <hr />

          </div>

          <div className="flex flex-col p-2 w-full gap-2">
            
              <h4 className="text-xl font-bold flex justify-between">Destination </h4>
              <p className='text-md text-gray-400'>Destination</p>
              <hr />

          </div>

          <div className="flex flex-col p-2 w-full gap-2">
            
              <h4 className="text-xl font-bold flex justify-between">Payment </h4>
              <p className='text-md text-gray-400'>Payment Mode</p>
             

          </div>

          {/* <button className='w-full px-8 py-2 bg-black text-white font-semibold text-md rounded-lg m'>Confirm Ride</button>
           */}

        </div>

    </div>
  )
}

export default LookingForDriver