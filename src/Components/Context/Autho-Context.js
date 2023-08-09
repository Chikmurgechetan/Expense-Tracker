import React from "react";
import { useState } from "react";
export const AppContext = React.createContext({
  email: "",
  setEmail: () => {},
  verifyEmail: false,
  setVerifyEmail: () => {},
});

const ContextProvider = (props) => {
  const [email, setEmail] = useState("");
  const [verifyEmail, setVerifyEmail] = useState(false);

  const ctxObj = {
    email: email,
    setEmail: setEmail,
    verifyEmail: verifyEmail,
    setVerifyEmail: setVerifyEmail,
  };

  return (
    <AppContext.Provider value={ctxObj}>{props.children}</AppContext.Provider>
  );
};

export default ContextProvider;
