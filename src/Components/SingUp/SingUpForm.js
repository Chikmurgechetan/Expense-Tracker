import React, { useContext, useState } from "react";
import classes from "./SingUpFrom.module.css";
import { AppContext } from "../Context/Autho-Context";
import { useNavigate } from "react-router-dom";


const SingUpForm = () => {
  const navigat = useNavigate();
  const ctx = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const switchHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(email, password, conformPassword);
    if (!isLogin && password !== conformPassword) {
      alert("Confirmation password does not match");
      return;
    }

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBkf4P6tcEA2uaVJe-UTssAymxMaTBMf2Q";

    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBkf4P6tcEA2uaVJe-UTssAymxMaTBMf2Q";
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      });

      const data = await response.json();
      if (data.error) {
        alert(data.error.message);
      } else {
        if (isLogin) {
          ctx.setIsLoggedIn(true);
          ctx.setidToken(data.idToken);
          ctx.setEmail(data.email);
          navigat("/home");
          localStorage.setItem("idToken", data.idToken);
        }
        setIsLogin(true);
      }

      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  const changeConformPassword = (event) => {
    setConformPassword(event.target.value);
  };

  return (
    <>
      <h1>Wellcome to Expense Tracker </h1>
      <div className={classes["signup-container"]}>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={submitHandler} className={classes.singForm}>
          <label className={classes.inputlabel}>
            Email:
            <input
              className={classes.forminput}
              type="email"
              value={email}
              onChange={changeEmail}
              placeholder="Email"
              required
            />
          </label>

          <label className={classes.inputlabel}>
            Password:
            <input
              className={classes.forminput}
              type="password"
              value={password}
              onChange={changePassword}
              placeholder="Password"
              required
            />
          </label>
          {!isLogin && (
            <label className={classes.inputlabel}>
              Confirm Password:
              <input
                className={classes.forminput}
                type="password"
                value={conformPassword}
                onChange={changeConformPassword}
                placeholder="Confirm Password"
                required
              />
            </label>
          )}
          <button type="submit" className={classes.singbutton}>
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {isLogin && (
          <a href="/Forgot-Password" className={classes.link}>
            Forgot Password
          </a>
        )}

        <button onClick={switchHandler} className={classes.singupButton}>
          {isLogin ? "Don't Have an Account? Sign Up" : "Login"}
        </button>
      
      </div>
    </>
  );
};

export default SingUpForm;
