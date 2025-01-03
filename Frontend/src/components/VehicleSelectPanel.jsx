import React from 'react';
import { FaUser } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const VehicleSelectPanel = ({ vehiclePanel, setVehiclePanel, setConfirmedVehicle, fare,selectedVehicle,setSelectedVehicle ,createRide}) => {
  // Array of vehicle options with fare from parent component
  const vehicles = [
    {
      name: "UberGo Car",
      img: "https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png",
      passengers: 4,
      time: "2 mins away",
      description: "Affordable, compact rides",
      price: `Rs. ${(fare.car ? fare.car.toFixed(2) : '0.00')}`,
      value: "car"
    },
    {
      name: "UberMotorcycle",
      img: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
      passengers: 1,
      time: "2 mins away",
      description: "Affordable, two-wheeler rides",
      price: `Rs. ${fare.motorcycle?.toFixed(2)}`,
      value: "motorcycle"
    },
    {
      name: "UberAuto",
      img: "https://i.pinimg.com/originals/2c/5e/14/2c5e1485755e664bcf7614cc4d492003.png",
      passengers: 3,
      time: "2 mins away",
      description: "Affordable, auto rides",
      price: `Rs. ${fare.auto?.toFixed(2)}`,
      value: "auto"
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      {vehicles.map((vehicle, index) => (
        <div key={index} className="flex items-center justify-between p-4 border rounded-lg active:border-black" onClick={() => setSelectedVehicle(vehicle.value)}>
          <div className="flex items-center gap-4">
            <img src={vehicle.img} alt={vehicle.name} className="w-16 h-16" />
            <div>
              <h4 className="text-lg font-semibold">{vehicle.name}</h4>
              <p className="text-sm">{vehicle.description}</p>
              <p className="text-sm">{vehicle.time}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FaUser className="text-xl" />
            <span>{vehicle.passengers}</span>
            <span className="font-semibold">{vehicle.price}</span>
          </div>
        </div>
      ))}
      <button
        className="w-full bg-black px-4 py-2 font-semibold text-lg text-white"
        onClick={() => {
          setConfirmedVehicle(true);
          setVehiclePanel(false);
          createRide();
        }}
      >
        Confirm Vehicle
      </button>
    </div>
  );
};

export default VehicleSelectPanel;