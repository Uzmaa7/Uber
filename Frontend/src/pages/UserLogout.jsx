import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import {useUserContext} from '../context/UserContext'


export const UserLogout = () => {
    const navigate = useNavigate();
    const {user, setUser, authToken, setAuthToken } = useUserContext()

   useEffect(() => {

    const logout = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/users/logout` , 
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
            setUser(null)
            navigate("/login");
        }
    };

    logout();
   }, [navigate, setUser, setAuthToken]);

};

export default UserLogout;