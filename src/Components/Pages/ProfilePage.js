import React from "react";
import classes from './ProfilePage.module.css';
import {useNavigate } from "react-router-dom";
const ProfilePage = () =>{
    const navigat = useNavigate()
   const ButtonHandler = () =>{
     navigat("/contect")
   }

    return(
        <>
        <div className={classes.profile}>
        <h3>Well Come to Expense Tracker</h3>
        <div className={classes.complet}>
            <h3>Your Profile is incomplet.
                <button  onClick={ButtonHandler}  className={classes.Profilebutton}>Complete now</button>
            </h3>
        </div>
        </div>
       
        </>
    )
};

export default ProfilePage;