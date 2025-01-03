import React from 'react'
import { FaUser } from 'react-icons/fa'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

const LookingForDriver = ({lookingForDriver,setLookingForDriver,pickUpLocation,destination,fare,selectedVehicle}) => {
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
          {selectedVehicle === 'car' && (
            <img src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="UberMoto" className="object-center w-full aspect-auto" />
          )}
          {selectedVehicle === 'auto' && (
            <img src="https://i.pinimg.com/originals/2c/5e/14/2c5e1485755e664bcf7614cc4d492003.png" alt="UberAuto" className="object-center w-full aspect-auto" />
          )}
          {selectedVehicle === 'motorcycle' && (
            <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="UberX" className="object-center w-full aspect-auto" />
          )}
          </div>
          <div className="flex flex-col p-2 w-full gap-2">
            
              <h4 className="text-xl font-bold flex justify-between">Location </h4>
              <p className='text-md text-gray-400'>{pickUpLocation}</p>
              <hr />

          </div>

          <div className="flex flex-col p-2 w-full gap-2">
            
              <h4 className="text-xl font-bold flex justify-between">Destination </h4>
              <p className='text-md text-gray-400'>{destination}</p>
              <hr />

          </div>

          <div className="flex flex-col p-2 w-full gap-2">
            
              <h4 className="text-xl font-bold flex justify-between">Payment </h4>
              <p className='text-md text-gray-400'>{fare}</p>
             

          </div>

          {/* <button className='w-full px-8 py-2 bg-black text-white font-semibold text-md rounded-lg m'>Confirm Ride</button>
           */}

        </div>

    </div>
  )
}

export default LookingForDriver