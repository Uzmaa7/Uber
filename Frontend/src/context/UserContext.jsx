import React, { createContext, useState } from 'react'

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

    return (
        <div>
            <UserDataContext.Provider value={{ user, setUser, authToken, setAuthToken, , setAuthToken, isAuthReady, setIsAuthReady }}>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default UserContext