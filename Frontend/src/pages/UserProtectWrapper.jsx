import React , {useState, useEffect} from "react";
import {useUserContext} from '../context/UserContext'
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProtectedWrapper = ({children}) => {
    const {user, setUser, authToken, setAuthToken, isAuthReady } = useUserContext()
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()

        useEffect(() => {

        //  wait until auth bootstrap finishes
        if (!isAuthReady) return;


        // no access token after bootstrap → not logged in
        if(!authToken){
            setIsLoading(false);
            navigate('/login')
            return;
        }

        //  token exists → validate

        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile` , {
            headers : {
                Authorization: `Bearer ${authToken}`,
            },
            withCredentials : true      // for refresh token cookie
        })
        .then((res) => {
            setUser(res.data.data.user);
            setIsLoading(false);
        })
        .catch((err) => {
            console.error(err);

            setAuthToken(null);
            navigate("/login");
        })
    }
    , [authToken, setUser,isAuthReady, setAuthToken]);

    //  block rendering until auth is ready
    if (!isAuthReady) {
        return <div>Loading...</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {children}
        </>
    )
}

export  default UserProtectedWrapper;