import { createContext, useContext, useState } from "react";

const CaptainContext = createContext(null)

export const useCaptainContext = () => {
    const context = useContext(CaptainContext)

    if(!context){
        throw new Error("useCaptainContext must be used within CaptainContextProvider");
    }
    return context
}

export const CaptainContextProvider = ({children}) => {

    const [captain, setCaptain] = useState({})
    const [authToken, setAuthToken] = useState(null); // for access token
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [isAuthReady, setIsAuthReady] = useState(false); // for tracking if auth bootstrap is done so that protected routes can wait for refresh token check

    return (
        <CaptainContext.Provider value={{captain, setCaptain, authToken, setAuthToken, error, setError, isLoading, setIsLoading, isAuthReady, setIsAuthReady}}>
            {children}
        </CaptainContext.Provider>
    )

}