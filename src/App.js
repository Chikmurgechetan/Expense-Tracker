import React, { useContext } from "react";
import SingUpForm from "./Components/Pages/SingUp/SingUpForm";
import ForgotPassword from "./Components/Pages/SingUp/ForgotPassowrd";
import { Route, Routes, Navigate } from "react-router-dom";
import ProfilePage from "./Components/ProfilePage/ProfilePage";
import ContectDetails from "./Components/Pages/ContectDetails";
import { AppContext } from "./Components/Context/Autho-Context";

function App() {
  const ctx = useContext(AppContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<SingUpForm />} />

        <Route path="/Forgot-Password" element={<ForgotPassword />} />
        {ctx.isLoggedIn && <Route path="/home" element={<ProfilePage />} />}
        {ctx.isLoggedIn && (
          <Route path="/contect" element={<ContectDetails />} />
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
