import React from "react";
import { useState } from "react";
export const AppContext = React.createContext({
  idToken: "",
  isLoggedIn: false,
  setidToken: () => {},
  Logout: () => {},

  email: "",
  setEmail: () => {},
  verifyEmai: false,
  setVerifyEmail: () => {},

  expenseLists: [],
  setExpenseLists: () => {},

  // userId: "",
  // setUserId: () => {},
});

const ContextProvider = (props) => {
  const initialToken = localStorage.getItem("idToken");
 // const userLocalid = localStorage.getItem("userId");

  const [idToken, setidToken] = useState(initialToken);

  const userIsLoggedIn = !!idToken;

  const [email, setEmail] = useState("");
  const [verifyEmail, setVerifyEmail] = useState(false);
   const [expenseLists, setExpenseLists] = useState([]);

 // const [userId, setUserId] = useState(userLocalid);

  const loggInHandler = (idToken) => {
    setidToken(idToken);
    localStorage.setItem("idToken", idToken);
   
  };

  const loggOutHandler = () => {
    setidToken(null);
    localStorage.removeItem("idToken");
  };

  const ctxObj = {
    idToken: idToken,
    isLoggedIn: userIsLoggedIn,
    setidToken: loggInHandler,
    Logout: loggOutHandler,

    email: email,
    setEmail: setEmail,
    verifyEmail: verifyEmail,
    setVerifyEmail: setVerifyEmail,

    expenseLists: expenseLists,
    setExpenseLists: setExpenseLists,

    // userId: userId,
    // setUserId: setUserId,
  };

  return (
    <AppContext.Provider value={ctxObj}>{props.children}</AppContext.Provider>
  );
};

export default ContextProvider;
