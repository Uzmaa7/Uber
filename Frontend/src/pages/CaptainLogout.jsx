import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import {useCaptainContext} from '../context/CaptainContext'


export const CaptainLogout = () => {
    const navigate = useNavigate();
    const {captain, setCaptain, authToken, setAuthToken } = useCaptainContext()

   useEffect(() => {

    const logout = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/captains/logout` , 
                {
                    headers : {
                        Authorization: `Bearer ${authToken}`
                    },
                },
                {
                    withCredentials : true // ✅ send refresh token cookie
                }
            )
        }
        catch (error) {
            console.error("Error while logging out user : ", error);
        }
        finally {
            // ✅ clear frontend auth state no matter what
            setAuthToken(null)
            setCaptain(null)
            navigate("/captain-login");
        }
    };

    logout();
   }, [navigate, setCaptain, setAuthToken]);

};

export default CaptainLogout;