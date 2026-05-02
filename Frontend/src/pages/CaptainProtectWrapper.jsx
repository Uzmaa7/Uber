import React , {useState, useEffect} from "react";
import { useCaptainContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainProtectedWrapper = ({children}) => {
    const {captain, setCaptain, authToken, setAuthToken, isAuthReady } = useCaptainContext()
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()

        useEffect(() => {

        //  wait until auth bootstrap finishes
        if (!isAuthReady) return;


        // no access token after bootstrap → not logged in
        if(!authToken){
            setIsLoading(false);
            navigate('/captain-login')
            return;
        }

        //  token exists → validate

        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile` , {
            headers : {
                Authorization: `Bearer ${authToken}`,
            },
            withCredentials : true      // for refresh token cookie
        })
        .then((res) => {
            setCaptain(res.data.data.captain)
            setIsLoading(false);
        })
        .catch((err) => {
            console.error(err);

            setAuthToken(null);
            navigate("/captain-login");
        })
    }
    ,  [setCaptain, setAuthToken, authToken, isAuthReady]);

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

export default CaptainProtectedWrapper;