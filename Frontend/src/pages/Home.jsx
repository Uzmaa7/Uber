import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css'

import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';


import { useContext } from 'react';
import { useUserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [pickup, setPickup] = useState('')
    const [panelOpen, setPanelOpen] = useState(false)
    const [destination, setDestination] = useState('')
    

    const vehiclePanelRef = useRef(null)
    const [vehiclePanel, setVehiclePanel] = useState(false)

    const [fare, setFare] = useState({})

    const confirmRidePanelRef = useRef(null)

    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)

    const vehicleFoundRef = useRef(null)
     const waitingForDriverRef = useRef(null)

    
    const [vehicleType, setVehicleType] = useState(null)
    const [confirmRidePanel, setConfirmRidePanel] = useState(false)
    const [vehicleFound, setVehicleFound] = useState(false)
    const [ waitingForDriver, setWaitingForDriver ] = useState(false)

    const {user, setUser, authToken, setAuthToken, isAuthReady } = useUserContext()
     const [activeField, setActiveField] = useState(null)
     const [pickUpSuggestions, setPickUpSuggestions] = useState([])
    const [destinationSuggestions, setDestinationSuggestions] = useState([])

    const navigate = useNavigate()


    const submitHandler = (e) => {
        e.preventDefault()
    }

    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                padding: 24
                // opacity:1
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0
                // opacity:0
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0
            })
        }
    }, [panelOpen])


    useGSAP(function () {
        if (vehiclePanel) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [vehiclePanel])

    useGSAP(function () {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [confirmRidePanel])

    useGSAP(function () {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [vehicleFound])

    useGSAP(function () {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ waitingForDriver ])


    const handlePickUpChange = async (e) => {
        setPickup(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/maps/get-suggestions`, {
                params : {
                    input : e.target.value
                },
                headers : {
                    Authorization : `Bearer ${authToken}`
                },
                withCredentials : true
            })
            // console.log("PickUp Suggestions => ", response.data.data)

            setPickUpSuggestions(response.data.data.suggestions)
        } catch (error) {
            console.log('Error while loading pickUp suggestions')
        }
    }

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/maps/get-suggestions`, {
                params : {
                    input : e.target.value
                },
                headers : {
                    Authorization : `Bearer ${authToken}`
                },
                withCredentials : true
            })

            // console.log("Destination Suggestions => ", response.data.data)

            setDestinationSuggestions(response.data.data.suggestions)
        } catch (error) {
            console.log('Error while loading Destination suggestions')
        }
    }

    const findTrip = async () => {
        setPanelOpen(false)
        setVehiclePanel(true)

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/rides/get-fare`, {
                params : {
                    pickup : pickup,
                    destination : destination
                },
                headers : {
                    Authorization : `Bearer ${authToken}`
                },
                withCredentials : true
            })

            // console.log('Fare => ', response.data.data.fare)

            setFare(response.data.data.fare)

        } catch (error) {
            console.log('Error while getting fare :', error.message)
        }
    }

    const createRide = async () => {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/rides/create`,
            {pickup, destination, vehicleType},
            {
                headers : {
                    Authorization : `Bearer ${authToken}`
                }
            }
        )

        // console.log("Create Ride Response => ", response.data.data)
    }

    return (
        <div className='h-screen relative overflow-hidden'>
            {/* Logo */}
            <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />

            {/* Map */}
            <div className='h-screen w-screen'>

                {/* image for temporary use  */}
                <img className='w-full object-fill' src="https://i.sstatic.net/gtiI7.gif" alt="" />

                {/* <LiveTracking /> */}
            </div>


            <div className=' flex flex-col justify-end h-screen absolute top-0 w-full'>
                <div className='h-[30%] p-6 bg-white relative'>
                    <h5 ref={panelCloseRef} onClick={() => {
                        setPanelOpen(false)
                    }} className='absolute opacity-0 right-6 top-6 text-2xl'>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>

                    <h4 className='text-2xl font-semibold'>Find a trip</h4>
                    <form className='relative py-3' onSubmit={(e) => {
                        submitHandler(e)
                    }}>
                        <div className="line absolute h-16 w-1 top-[50%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('pickup')

                            }}
                            onChange = {(e) => handlePickUpChange(e)}
                            value={pickup}

                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full'
                            type="text"
                            placeholder='Add a pick-up location'
                        />
                        <input
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('destination')

                            }}

                            onChange = {(e) => {handleDestinationChange(e)}}
                            value={destination}

                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full  mt-3'
                            type="text"
                            placeholder='Enter your destination' />
                    </form>

                    <button
                        onClick={findTrip}
                        className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
                        Find Trip
                    </button>
                </div>

                <div ref={panelRef} className='bg-white h-0'>
                    <LocationSearchPanel

                        setPanelOpen={setPanelOpen}
                        activeField = {activeField}
                        suggestions = {activeField === 'pickup' ? pickUpSuggestions : destinationSuggestions}
                        
                        setPickup = {setPickup}
                        setDestination = {setDestination}


                        setVehiclePanel={setVehiclePanel}
                        vehiclePanel={vehiclePanel}

                    />
                </div>
            </div>


            <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
                <VehiclePanel
                    fare = {fare}
                    
                    setVehiclePanel={setVehiclePanel}
                    setPanelOpen={setPanelOpen}

                    selectVehicle={setVehicleType}
                    setConfirmRidePanel={setConfirmRidePanel}

                    setVehicleType = {setVehicleType}
                />
            </div>

            <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
                <ConfirmRide
                    createRide = {createRide}
                    pickup = {pickup}
                    destination = {destination}
                    fare = {fare[vehicleType]}
                    vehicleType={vehicleType}

                    setVehiclePanel = {setVehiclePanel}
                    setConfirmRidePanel={setConfirmRidePanel}
                    setVehicleFound={setVehicleFound} />
            </div>

            <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
                <LookingForDriver

                    pickup = {pickup}
                    destination = {destination}
                    setDestination = {setDestination}
                    setPickup = {setPickup}
                    
                    fare = {fare[vehicleType]}
                    
                    setVehicleFound = {setVehicleFound}
                    vehicleType={vehicleType}
                />
            </div>

             <div ref={waitingForDriverRef} className='fixed w-full  z-10 bottom-0  bg-white px-3 py-6 pt-12'>
                <WaitingForDriver
                    
                    setVehicleFound={setVehicleFound}
                    setWaitingForDriver={setWaitingForDriver}
                    waitingForDriver={waitingForDriver} />
            </div>


        </div>
    )
}

export default Home