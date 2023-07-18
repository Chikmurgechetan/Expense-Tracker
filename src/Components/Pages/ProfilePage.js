import React, { useContext } from "react";
import classes from "./ProfilePage.module.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/Autho-Context";
const ProfilePage = () => {

   const ctx = useContext(AppContext); 
  const navigat = useNavigate();
  const ButtonHandler = () => {
    navigat("/contect");
  };
  
  const logoutHandler = () =>{
    ctx.setIsLoggedIn(false);
    localStorage.setItem('idToken' , '');
    ctx.setidToken(null);
    navigat('/');
    console.log('logign out')
  }

  return (
    <>
      <button className={classes.lbutton} onClick={logoutHandler}>Logout</button>
      <div className={classes.profile}>
        <h3>Well Come to Expense Tracker</h3>

        <div className={classes.complet}>
          <h3>
            Your Profile is incomplet.
            <button onClick={ButtonHandler} className={classes.Profilebutton}>
              Complete now
            </button>
          </h3>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
