import React, { useState } from "react";
import classes from "./ForgotPassword.module.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
   const navigat = useNavigate(); 
  const [email, setEmail] = useState("");


  const resetSubmitHander = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBkf4P6tcEA2uaVJe-UTssAymxMaTBMf2Q",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: email,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert(
          "A Pssworde reset link Is send your Email"
        );
        navigat('/')

      } else {
        throw new Error("Send password reset email failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  return (
    <>
      <h3>change the password</h3>
      <form onSubmit={resetSubmitHander} className={classes.eform}>
        <label htmlFor="email" className={classes.elabel}>
          EMAIL
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={onChangeEmail}
          className={classes.einput}
        />
        <button type="submit" className={classes.ebutton}>
          Reset password
        </button>
      </form>
    </>
  );
};
export default ForgotPassword;
