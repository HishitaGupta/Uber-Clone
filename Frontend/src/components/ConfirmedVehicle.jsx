import React from 'react'
import { FaUser } from 'react-icons/fa'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

const ConfirmedVehicle = ({confirmedVehicle,setConfirmedVehicle,setLookingForDriver}) => {
  return (
    <div>
        <h2 className="text-2xl font-semibold mb-2 flex justify-between">Vehicle Details
        <MdOutlineKeyboardArrowDown
            className={`absolute right-4 top-4 text-xl cursor-pointer ${confirmedVehicle===true ? '' : 'rotate-180'}`}
            onClick={() => (setConfirmedVehicle(!confirmedVehicle))} // Close panel on click
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

          <button className='w-full px-8 py-2 bg-black text-white font-semibold text-md rounded-lg m' onClick={()=>{
            setLookingForDriver(true)
            setConfirmedVehicle(false)
          }}>Confirm Ride</button>
          

        </div>

        {/* <div className="flex justify-between items-center active:border-black p-4 border rounded-xl">
          <div className="h-25 w-1/4 flex justify-center items-center ">
            <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" className="object-center w-full aspect-auto" /></div>
          <div className="w-2/4 text-sm p-2">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-bold flex justify-between">UberMoto </h4>
              <p className="flex gap-1 justify-start items-center"><FaUser className="text-gray-500" />4</p>
            </div>

            <h5>2 mins away</h5>
            <p className="text-xs text-gray-500">Affordable, compact rides</p>

          </div>
          <h2 className="text-lg p-2 font-semibold">Rs. 193</h2>

        </div>

        <div className="flex justify-between items-center p-4 border active:border-black rounded-xl">
          <div className="h-25 w-1/4 flex justify-center items-center ">
            <img src="https://th.bing.com/th/id/OIP.gERohywpalGF3NjolmHt5wHaE7?rs=1&pid=ImgDetMain" alt="" className="object-center w-full aspect-auto" /></div>
          <div className="w-2/4 text-sm p-2">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-bold flex justify-between">UberAuto </h4>
              <p className="flex gap-1 justify-start items-center"><FaUser className="text-gray-500" />4</p>
            </div>

            <h5>2 mins away</h5>
            <p className="text-xs text-gray-500">Affordable, compact rides</p>

          </div>
          <h2 className="text-lg p-2 font-semibold">Rs. 193</h2>

        </div> */}
    </div>
  )
}

export default ConfirmedVehicle