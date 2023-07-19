import React from "react";
import SingUpForm from "./Components/Pages/SingUp/SingUpForm";

import { Route, Routes,Navigate } from "react-router-dom";
import ProfilePage from "./Components/Pages/ProfilePage";
import ContectDetails from "./Components/Pages/ContectDetails";

import ForgotPassword from "./Components/SingUp/ForgotPassowrd";

function App() {
 
  return (
    <>
      <Routes>
        <Route path="/" element={<SingUpForm />} />
        <Route path="/Forgot-Password" element={<ForgotPassword />} />
        <Route path="/home" element={<ProfilePage />} />
        <Route path="/contect" element={<ContectDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
