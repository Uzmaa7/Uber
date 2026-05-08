import React ,{createContext , useContext, useEffect} from "react";
import {io} from 'socket.io-client'


const socketContext = createContext()

const useSocketContext = () => {
    const context = useContext(socketContext)

    if(!context){
        throw new Error("useSocketContext must be used within socketContextProvider");
    }

    return context
}

const socket = io(`${import.meta.env.VITE_BASE_URL}`, {
    transports : ['websocket']
})

const SocketContextProvider = ({children}) => {

    useEffect(() => {
        // basic connection logic
        socket.on('connect', () => {
            console.log('Connected to server');
        })

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

    }, [])

    return (
        <socketContext.Provider value={{socket}}>
            {children}
        </socketContext.Provider>
    )
}


export {
    useSocketContext,
    SocketContextProvider,
    socketContext
}