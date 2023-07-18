import React from "react";
import SingUpForm from "./Components/SingUp/SingUpForm";

import { Route, Routes } from "react-router-dom";
import ProfilePage from "./Components/Pages/ProfilePage";
import ContectDetails from "./Components/Pages/ContectDetails";
import { useContext } from "react";
import { AppContext } from "./Components/Context/Autho-Context";
import ForgotPassword from "./Components/SingUp/ForgotPassowrd";

function App() {
  const ctx = useContext(AppContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<SingUpForm />} />
        <Route path="/Forgot-Password" element={<ForgotPassword/>}/>
      {ctx.isLoggedIn && <Route path="/home" element={<ProfilePage />} /> }  
      {ctx.isLoggedIn &&  <Route path="/contect"element={<ContectDetails/>} /> } 

      </Routes>
    </>
  );
}

export default App;
