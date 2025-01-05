import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { FiLogOut } from "react-icons/fi";
import { CaptainDataContext } from '../context/CaptainContext'
import { SocketContext } from '../context/SocketContext'
import axios from 'axios'
import LiveTracking from '../components/LiveTracking'

const CaptainHome = () => {
    const [ridePopupPanel, setRidePopupPanel] = useState(false)
    const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)

    const ridePopupPanelRef = useRef(null)
    const confirmRidePopupPanelRef = useRef(null)
    const [ride, setRide] = useState(null)

    const { socket,sendMessage,receiveMessage } = React.useContext(SocketContext)
    const { captain} = React.useContext(CaptainDataContext)

    useEffect(()=>{
        console.log("IN home",captain);
        sendMessage('join',{userType:"captain",userId:captain?._id})

        const updateLocation = () => {
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(position=>
                    socket.emit("update-location-captain",{
                        userId:captain?._id,
                        location:{
                            type:"Point",
                            coordinates:[position.coords.longitude,position.coords.latitude]
                        }})
                )
            }
        }

        const interval = setInterval(updateLocation,10000)
        updateLocation()

        return () => clearInterval(interval)



      },[])

    //   useEffect(() => {
    //     if (socket) {
    //       receiveMessage("new-ride", (data) => {
    //         console.log("New ride received:", data);
    //         setRide(data);
    //         setRidePopupPanel(true);
    //       });
    //     }
    //   }, [socket, receiveMessage]);
    
      const onSubmitHandler = (e) => {
        e.preventDefault();
      };

    useEffect(() => {
        if (socket) {
          console.log("Setting up socket listener for new-ride event");
          receiveMessage("new-ride", (data) => {
            console.log("New ride received:", data);
            setRide(data);
            setRidePopupPanel(true);
          });
        }
      }, [socket, receiveMessage])

      async function confirmRide(){
        
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/rides/confirm`,{
            rideId:ride._id,
            captainId:captain._id,

            
        },{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('token')}`
            }
        })
      }


    

    // Animation hooks for popups
    useGSAP(function () {
        if (ridePopupPanel) {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ridePopupPanel])

    useGSAP(function () {
        if (confirmRidePopupPanel) {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [confirmRidePopupPanel])

    return (
        <div className="h-screen">
            <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
                <img className="w-16" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
                <Link to="/captain/logout" className="h-10 w-10 bg-white flex items-center justify-center rounded-full">
                    <FiLogOut className="text-2xl text-black" />
                </Link>
            </div>
            <div className="h-3/5">
                {/* <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="Ride GIF" /> */}
                <LiveTracking/>
            </div>
            <div className="h-2/5 p-6">
                <CaptainDetails />
            </div>
            <div ref={ridePopupPanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12">
                <RidePopUp
                    ride={ride}
                    setRidePopupPanel={setRidePopupPanel}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    confirmRide={confirmRide}
                />
            </div>
            <div ref={confirmRidePopupPanelRef} className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12">
                <ConfirmRidePopUp
                    ride={ride}
                    setConfirmRidePopupPanel={setConfirmRidePopupPanel}
                    setRidePopupPanel={setRidePopupPanel}
                />
            </div>
        </div>
    )
}

export default CaptainHome
