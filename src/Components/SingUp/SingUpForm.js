import React, { useState } from "react";
import classes from "./SingUpFrom.module.css";

const Singup = (singData)=>{
      fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBkf4P6tcEA2uaVJe-UTssAymxMaTBMf2Q",
     {
        method:'POST',
        body : JSON.stringify(singData),
        headers:{
            'Content-Type':'application/json'
        }
     }).then((response)=>{
        console.log(response);
     }).catch((error)=>{
        console.log(error);
     })

}


const SingUpForm = () => {
   const [email,setEmail] = useState("");
   const [password,setPassword] = useState("");
   const [conformPassword,setconformPassword] = useState("");

    const SubmitHandelr = (event) =>{
    event.preventDefault()
    console.log(email,password,conformPassword);

    if (password === conformPassword){
        Singup({  email: email,
                password: password,
                 returnSecureToken: true})

        setEmail('');
        setPassword('');
        setconformPassword('')
    }else{
        alert('password mismatch')
    };
    console.log(' User has successfully signed up')
    }

    const changeEmail = (event) =>{
        setEmail(event.target.value);
    }
    const changePasswword = (event) =>{
        setPassword(event.target.value);
    }
    const changeConformPassword = (event) =>{
        setconformPassword(event.target.value);
    }

  return (
    <>
      <div className={classes["signup-container"]}>
        <h2>SingUp</h2>
        <form onSubmit={SubmitHandelr}>
          <label >
            Email:
            <input type="email"  value={email} onChange={changeEmail} required />
          </label>

          <label >
            Password:
            <input type="password" value={password} onChange={changePasswword} required />
          </label>
          <label >
            Conform Password:
            <input type="password" value={conformPassword} onChange={changeConformPassword} required />
          </label>
          <button type="sunmit">Sing Up</button>
        </form>
        <div>
          <p>
            Have an account?
            <button>Login</button>
          </p>
        </div>
      </div>
    </>
  );
};

export default SingUpForm;
