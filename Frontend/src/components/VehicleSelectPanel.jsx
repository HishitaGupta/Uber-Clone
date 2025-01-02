import React from 'react';
import { FaUser } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const VehicleSelectPanel = ({ vehiclePanel, setVehiclePanel, setConfirmedVehicle }) => {
  // Array of vehicle options
  const vehicles = [
    {
      name: "UberGo",
      img: "https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png",
      passengers: 4,
      time: "2 mins away",
      description: "Affordable, compact rides",
      price: "Rs. 193",
    },
    {
      name: "UberMoto",
      img: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
      passengers: 1,
      time: "2 mins away",
      description: "Affordable, two-wheeler rides",
      price: "Rs. 100",
    },
    {
      name: "UberAuto",
      img: "https://th.bing.com/th/id/OIP.gERohywpalGF3NjolmHt5wHaE7?rs=1&pid=ImgDetMain",
      passengers: 3,
      time: "2 mins away",
      description: "Auto-rickshaw rides",
      price: "Rs. 120",
    },
  ];

  return (
    <div >
      <h2 className="text-2xl font-semibold mb-2 flex justify-between">
        Choose A Ride
        <MdOutlineKeyboardArrowDown
          className={`absolute right-4 top-4 text-xl cursor-pointer ${
            vehiclePanel === true ? '' : 'rotate-180'
          }`}
          onClick={() => setVehiclePanel(!vehiclePanel)} // Toggle panel visibility
        />
      </h2>

      {/* Map through vehicles array to dynamically render options */}
      {vehicles.map((vehicle, index) => (
        <div
          key={index}
          className="flex justify-between items-center p-4 border rounded-xl active:border-black"
          onClick={() =>{setConfirmedVehicle(true)
        setVehiclePanel(false)}}
        >
          <div className="h-25 w-1/4 flex justify-center items-center">
            <img src={vehicle.img} alt={vehicle.name} className="object-center w-full aspect-auto" />
          </div>
          <div className="w-2/4 text-sm p-2">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-bold">{vehicle.name}</h4>
              <p className="flex gap-1 items-center">
                <FaUser className="text-gray-500" /> {vehicle.passengers}
              </p>
            </div>
            <h5>{vehicle.time}</h5>
            <p className="text-xs text-gray-500">{vehicle.description}</p>
          </div>
          <h2 className="text-lg p-2 font-semibold">{vehicle.price}</h2>
        </div>
      ))}
    </div>
  );
};

export default VehicleSelectPanel;
