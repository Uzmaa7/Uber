import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserContextProvider from "./context/UserContext.jsx";
import {CaptainContextProvider} from "./context/CaptainContext.jsx"
import {BrowserRouter} from "react-router-dom";
import { SocketContextProvider } from './context/SocketContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <CaptainContextProvider>

      <UserContextProvider>

        <SocketContextProvider>

          <BrowserRouter>
            <App />
          </BrowserRouter>

        </SocketContextProvider>
        
      </UserContextProvider>
    
    </CaptainContextProvider>

  </StrictMode>,
)
