import React from "react";
import { useState } from "react";
export const AppContext = React.createContext({
  idToken: "",
  isLoggedIn: false,
  setidToken: () => {},
  setIsLoggedIn: () => {},

  email:'',
  setEmail:()=>{},
  verifyEmai:false,
  setVerifyEmail:()=>{}


});

const ContextProvider = (props) => {
  const useridToken = localStorage.getItem("idToken")
    ? localStorage.getItem("idToken")
    : "";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [idToken, setidToken] = useState(useridToken);
  
  const [email,setEmail] = useState('text@gmail.com')
  const [verifyEmail,setVerifyEmail] = useState(false);


  const ctxObj = {
    idToken: idToken,
    isLoggedIn: isLoggedIn,
    setidToken: setidToken,
    setIsLoggedIn: setIsLoggedIn,
    email:email,
    setEmail:setEmail,
    verifyEmail:verifyEmail,
    setVerifyEmail:setVerifyEmail
  };

  return (
    <AppContext.Provider value={ctxObj}>{props.children}</AppContext.Provider>
  );
};

export default ContextProvider;
