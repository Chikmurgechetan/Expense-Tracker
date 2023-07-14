import React, { useContext, useState } from "react";
import classes from "./ContectDetails.module.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import { AppContext } from "../Context/Autho-Context";

const ContectDetails = () => {
  const ctx = useContext(AppContext)
  const [name, setName] = useState("");
  const [progileUrl, setProfileUrl] = useState("");

  const submitHandler = (event) =>{
     event.preventDefault()
     console.log(name,progileUrl);
     
   fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBkf4P6tcEA2uaVJe-UTssAymxMaTBMf2Q",
   {
     method:'POST',
     body: JSON.stringify({
        displayName	: name,
        photoUrl: progileUrl,
        idToken: ctx.idToken,
        returnSecureToken: true

     }),
     headers: {
      'Content-Type': 'application/json'
    },
   }).then((response)=>{
    alert('Profile Updated');
      console.log(response);
   }).catch((error)=>{
    alert(error);
   })

  }
   
  const changeName = event =>{
    setName(event.target.value);
  }
  const changeProfileUrl = event =>{
    setProfileUrl(event.target.value);
  }


  return (
    <>
      <div className={classes.Contect}>
        <h2 className={classes.h2}>
          Contact Details
          <button className={classes.cancle}>Cancel</button>
        </h2>

        <form className={classes.forms} onSubmit={submitHandler}>
          <label className={classes.labels}>
            <GitHubIcon /> Full Name:
            <input type="text"   value={name}  onChange={changeName} className={classes.nameinput} />
          </label>
          <label className={classes.labels}>
            <LanguageIcon /> Profile Photo URl:
            <input type="text"  value={progileUrl} onChange={changeProfileUrl} className={classes.nameinput} />
          </label>
          <button type="submit" className={classes.updatebtn}>
            Update
          </button>
        </form>
      </div>
    </>
  );
};
export default ContectDetails;
