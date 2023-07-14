import React from "react";
import SingUpForm from "./Components/SingUp/SingUpForm";

import { Route, Routes } from "react-router-dom";
import ProfilePage from "./Components/Pages/ProfilePage";
import ContectDetails from "./Components/Pages/ContectDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SingUpForm />} />
        <Route path="/home" element={<ProfilePage />} />
        <Route path="/contect"element={<ContectDetails/>} />

      </Routes>
    </>
  );
}

export default App;
