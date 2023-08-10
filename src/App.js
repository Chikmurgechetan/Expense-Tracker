import React from "react";
import { useSelector } from "react-redux";
import SingUpForm from "./Components/Pages/SingUp/SingUpForm";
import ForgotPassword from "./Components/Pages/SingUp/ForgotPassowrd";
import { Route, Routes, Navigate } from "react-router-dom";
import ProfilePage from "./Components/ProfilePage/ProfilePage";
import ContectDetails from "./Components/Pages/ContectDetails";


function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLogin);
 return (
    <>
      <Routes>
        <Route path="/" element={<SingUpForm />} />
        <Route path="/Forgot-Password" element={<ForgotPassword />} />
        {isLoggedIn && <Route path="/home" element={<ProfilePage />} />}
        {isLoggedIn && <Route path="/contect" element={<ContectDetails />} />}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
