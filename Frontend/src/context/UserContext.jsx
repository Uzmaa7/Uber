import React, { createContext, useState, useContext, useEffect } from 'react'

const UserContext = createContext(null);

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within UserProvider");
    }
    return context;
};

const UserContextProvider = ({ children }) => {

    const [ user, setUser ] = useState({
        email: '',
        fullName: {
            firstName: '',
            lastName: ''
        }
    })

    const [authToken, setAuthToken] = useState(null); 
    const [isAuthReady, setIsAuthReady] = useState(false);

    useEffect(() => {
        
        setIsAuthReady(true);
    }, []);

    return (
        <div>
            <UserContext.Provider value={{ user, setUser, authToken, setAuthToken,  isAuthReady, setIsAuthReady }}>
                {children}
            </UserContext.Provider>
        </div>
    )
}

export default UserContextProvider