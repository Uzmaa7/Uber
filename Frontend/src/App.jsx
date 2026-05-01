import React from "react"
import {Route, Routes} from "react-router-dom";
import Start from "./pages/Start.jsx";
import UserLogin from "./pages/UserLogin.jsx"
import UserSignup from "./pages/UserSignup.jsx";
import CaptainLogin from "./pages/CaptainLogin.jsx";
import CaptainSignup from "./pages/CaptainSignup.jsx";
import Home from "./pages/Home.jsx";
import UserProtectedWrapper from "./pages/UserProtectedWrapper.jsx"

function App() {
  return (
    <div>

      <Routes>

        <Route path="/" element={<Start/>} />

        <Route path="/home" element={
            <UserProtectedWrapper>
                <Home/>
            </UserProtectedWrapper>
              } />

        <Route path="/login" element={<UserLogin/>} />

        <Route path="/signup" element={<UserSignup/>} />

        <Route path="/captain-login"  element = {<CaptainLogin/>} />

        <Route path="/captain-signup"  element = {<CaptainSignup/>} />

        

      </Routes>

    </div>
  )
}

export default App