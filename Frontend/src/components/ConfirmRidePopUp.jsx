import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useCaptainContext } from '../context/CaptainContext.jsx';


const ConfirmRidePopUp = (props) => {
    const [otp, setOtp] = useState("");
    const otpInputRef = useRef(null)

    const { authToken } = useCaptainContext()

    const navigate = useNavigate()

    const submitHandler = async(e) => {
        e.preventDefault()

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/rides/start-ride`,
            {
                params : {
                    rideId : props.ride._id,
                    otp : otp
                },
                headers : {
                    Authorization : `Bearer ${authToken}`
                },
                withCredentials : true
            }
        )

        if(response.status === 200){
            props.setRidePopupPanel(false)
            props.setConfirmRidePopupPanel(false)
            // console.log("In the confirm ride pop up" , props.ride)
            navigate('/captain-riding' , {state : {ride : props.ride}})
        }

    }

    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setRidePopupPanel(false)
                props.setConfirmRidePopupPanel(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Confirm this ride to Start</h3>
            <div className='flex items-center justify-between p-3 border-2 border-yellow-400 rounded-lg mt-4'>
                <div className='flex items-center gap-3 '>
                    <img className='h-12 rounded-full object-cover w-12' src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg" alt="" />
                    <h2 className='text-lg font-medium capitalize'>{props.ride?.user?.fullname.firstname + " " + props.ride?.user?.fullname.lastname}</h2>
                </div>
                <h5 className='text-lg font-semibold'>2.2 KM</h5>
            </div>
            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>Pickup</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>Destination</h3>
                            <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>

                <div className='mt-6 w-full'>
                    <form
                        onSubmit={(e) => {
                            submitHandler(e);
                        }}>
                        <input
                            ref={otpInputRef}
                            // type = 'Number'
                            onChange={(e) => { setOtp(e.target.value) }}
                            placeholder='Enter OTP'
                        />
                        <button
                            onClick={() => {
                                submitHandler
                            }}
                            className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>
                            Confirm </button>

                        <button
                            onClick={() => {
                                props.setRidePopupPanel(false)
                                props.setConfirmRidePopupPanel(false)
                            }}
                            className='mt-2 w-full bg-red-600 text-white font-semibold p-2 px-10 rounded-lg'>
                            Cancel </button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default ConfirmRidePopUp