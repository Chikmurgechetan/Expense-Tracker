import React, { useContext, useState } from "react";
import classes from "./ProfilePage.module.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/Autho-Context";
import ExpenxeForm from "../Expenses/ExpenseForm";
import ExpenseList from "./ExpenseFormList";

const ProfilePage = () => {
  const ctx = useContext(AppContext);
  const navigat = useNavigate();

  //this is Expesne from show on screen
  const [expenseList,setExpenseList] = useState([])


  const submitHandler = (value) =>{
      setExpenseList((previesList)=>{
        return [value, ...previesList]
      })
  }



///this is complete profile button
  const ButtonHandler = () => {
    navigat("/contect");
  };

  // this is logout button
  const logoutHandler = () => {
    ctx.setIsLoggedIn(false);
    localStorage.removeItem("idToken", "");
    ctx.setidToken(null);
    navigat("/");
    console.log("logign out");
  };

  return (
    <>
      <button className={classes.lbutton} onClick={logoutHandler}>
        Logout
      </button>
      <div className={classes.profile}>
        <h3>WellCome to Expense Tracker</h3>

        <div className={classes.complet}>
          <h3>
            Your Profile is incomplet.
            <button onClick={ButtonHandler} className={classes.Profilebutton}>
              Complete now
            </button>
          </h3>
        </div>
      </div>
      <ExpenxeForm  showList={submitHandler}/>
      <ExpenseList lists={expenseList}/>
    </>
  );
};

export default ProfilePage;
