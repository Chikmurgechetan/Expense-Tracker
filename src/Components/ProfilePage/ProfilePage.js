import React, { useContext } from "react";
import classes from "./ProfilePage.module.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/Autho-Context";
import ExpenxeForm from "../Expenses/ExpenseForm";
import ExpenseList from "../Expenses/ExpenseFormList";

const ProfilePage = () => {
  const ctx = useContext(AppContext);
  const navigat = useNavigate();

  //this is Expesne from show on screen
  
 const submitHandler = (value) => {
    ctx.setExpenseLists((previesList) => {
      return [value, ...previesList];
    });
  };

  ///this is complete profile button
  const ButtonHandler = () => {
    navigat("/contect");
  };

  // this is logout button
  const logoutHandler = () => {
    ctx.Logout();
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
      <ExpenxeForm showList={submitHandler} />
      <ExpenseList />
    </>
  );
};

export default ProfilePage;
