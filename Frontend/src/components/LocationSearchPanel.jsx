import React from 'react';
import { MdLocationCity } from 'react-icons/md';

const LocationPanel = ({vehiclePanel,setVehiclePanel,setPanelOpen}) => {
  // Location data
  const locations = [
    "#98, Guru Nanak Nagar, Nalas Road, Rajpura",
    "#99, Sunrise Apartments, MG Road, Bangalore",
    "#100, Sector 45, Mohali, Chandigarh",
    "#101, Green Valley, Park Lane, Delhi",
    "#102, Blue Ridge, Palm Beach Road, Mumbai",
  ];

  return (
    <div className='flex flex-col gap-2' onClick={()=>{setVehiclePanel(!vehiclePanel)
      setPanelOpen(false)}
    }>
      {locations.map((location, index) => (
        <div key={index} className="flex gap-2 p-2 items-center justify-start border active:border-black rounded-xl ">
          <MdLocationCity className="w-10 h-10 p-2 bg-[#eee] rounded-full" />
          <h4>{location}</h4>
        </div>
      ))}
    </div>
  );
};

export default LocationPanel;
