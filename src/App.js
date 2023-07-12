import React from "react";
import SingUpForm from "./Components/SingUp/SingUpForm";

import { Route, Routes } from "react-router-dom";
import Home from "./Components/Pages/Home";

function App() {
  return (<>
  <Routes>
   <Route path="/" element={<SingUpForm/>} /> 
   <Route path="/home" element={<Home/>} />
  </Routes>


  </>
    
  );
}

export default App;
