import React, { useRef } from "react";
import { MdOutlineKeyboardArrowDown, } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import gsap from "gsap";
import LocationPanel from "../components/LocationSearchPanel";
import { MdFace } from "react-icons/md";
import VehicleSelectPanel from "../components/VehicleSelectPanel";
import ConfirmedVehicle from "../components/ConfirmedVehicle";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  const [pickUpLocation, setPickUpLocation] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [panelOpen, setPanelOpen] = React.useState(false);
  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmedVehicleRef = useRef(null);
  const lookingForDriverRef = useRef(null);
  const waitingForDriverRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = React.useState(false);
  const [confirmedVehicle, setConfirmedVehicle] = React.useState(false);
  const [lookingForDriver, setLookingForDriver] = React.useState(false);
  const [waitingForDriver, setWaitingForDriver] = React.useState(false);

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  React.useEffect(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, { height: "70%", opacity: 1, duration: 0.3, display: "flex" });
    } else {
      gsap.to(panelRef.current, { height: "0", opacity: 0, duration: 0.3, display: "none" });
    }
  }, [panelOpen]);

  React.useEffect(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, { transform: "translateY(0)", duration: 0.3 });
    } else {
      gsap.to(vehiclePanelRef.current, { transform: "translateY(100%)", duration: 0.3 });
    }
  }, [vehiclePanel]);

  React.useEffect(() => {
    if (confirmedVehicle) {
      gsap.to(confirmedVehicleRef.current, { transform: "translateY(0)", duration: 0.3 });
    } else {
      gsap.to(confirmedVehicleRef.current, { transform: "translateY(100%)", duration: 0.3 });
    }
  }, [confirmedVehicle]);

  React.useEffect(() => {
    if (lookingForDriver) {
      gsap.to(lookingForDriverRef.current, { transform: "translateY(0)", duration: 0.3 });
      setTimeout(()=>{
        setWaitingForDriver(true)
        setLookingForDriver(false)
      },[3000])
    } else {
      gsap.to(lookingForDriverRef.current, { transform: "translateY(100%)", duration: 0.3 });
    }
  }, [lookingForDriver,waitingForDriver]);

  React.useEffect(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, { transform: "translateY(0)", duration: 0.3 });
      
    } else {
      gsap.to(waitingForDriverRef.current, { transform: "translateY(100%)", duration: 0.3 });
    }
  }, [waitingForDriver]);

  

  return (
    <div className="relative flex flex-col h-screen justify-between overflow-hidden">
      <div className="p-7 z-10">
        <img
          src="https://logospng.org/download/uber/logo-uber-4096.png"
          alt=""
          className="w-20"
        />
      </div>
      <img
        src="https://preview.redd.it/15jedtrp9u631.png?width=640&crop=smart&auto=webp&s=0ea0b6faf591210f9ad56c0e4cbebe177a242557"
        alt=""
        className="w-full object-cover absolute h-screen inset-0"
      />

      <div className="z-10 flex flex-col h-screen absolute top-0 w-full justify-end">
        <div className="relative bg-white h-[30%] flex flex-col gap-4 p-5">
          <h4 className="text-2xl font-semibold">Find A Trip</h4>
          <MdOutlineKeyboardArrowDown
            className={`absolute right-4 top-4 text-xl cursor-pointer ${panelOpen ? '' : 'rotate-180'}`}
            onClick={() => (setPanelOpen(!panelOpen))} // Close panel on click
          />

          <form
            action=""
            className="relative flex flex-col gap-4"
            onSubmit={(e) => onSubmitHandler(e)}
          >
            <div className="line absolute h-[2px] w-10 -left-2 bg-black rotate-90 top-12 "></div>
            <input
              className="bg-[#eee] px-8 py-2"
              type="text"
              placeholder="Add a pick up location"
              value={pickUpLocation}
              onChange={(e) => {
                setPickUpLocation(e.target.value);
              }}
              onClick={() => {
                setPanelOpen(true); // Open panel on click
              }}
            />
            <input
              className="bg-[#eee] px-8 py-2"
              type="text"
              placeholder="Enter your destination"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              onClick={() => {
                setPanelOpen(true); // Open panel on click
              }}
            />
          </form>
        </div>
        <div
          className="h-0 overflow-hidden flex-col gap-4 bg-white p-5"
          ref={panelRef}
        ><LocationPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} /></div>
      </div>

      <div
        className="w-full fixed z-10 bottom-0 bg-white flex flex-col gap-4 p-4 translate-y-full" ref={vehiclePanelRef}
      >
        <VehicleSelectPanel vehiclePanel={vehiclePanel} setVehiclePanel={setVehiclePanel} setConfirmedVehicle={setConfirmedVehicle}/>
      </div>

      <div
        className="w-full fixed z-10 bottom-0 bg-white flex flex-col gap-4 p-4 translate-y-full" ref={confirmedVehicleRef}
      >
        <ConfirmedVehicle confirmedVehicle={confirmedVehicle} setConfirmedVehicle={setConfirmedVehicle} setLookingForDriver={setLookingForDriver}/>
      </div>

      <div
        className="w-full fixed z-10 bottom-0 bg-white flex flex-col gap-4 p-4 translate-y-full" ref={lookingForDriverRef}
      >
        <LookingForDriver lookingForDriver={lookingForDriver} setLookingForDriver={setLookingForDriver} />
      </div>

      <div
        className="w-full fixed z-10 bottom-0 bg-white flex flex-col gap-4 p-4 translate-y-full" ref={waitingForDriverRef}
      >
        <WaitingForDriver waitingForDriver={waitingForDriver} setWaitingForDriver={setWaitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
