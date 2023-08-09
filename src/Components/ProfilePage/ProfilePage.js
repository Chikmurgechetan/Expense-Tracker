
import classes from "./ProfilePage.module.css";
import { useNavigate } from "react-router-dom";

import ExpenxeForm from "../Expenses/ExpenseForm";
import ExpenseList from "../Expenses/ExpenseFormList";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/Reduers/Autho-reducers";
import { expenxeAction } from "../Store/Reduers/Expense-reducer";

const ProfilePage = () => {
  ///const ctx = useContext(AppContext);
  const navigat = useNavigate();
  const dispatch = useDispatch();
  const expenseList = useSelector(state=>state.expenes.expeneseList)

  //this is Expesne from show on screen

  const submitHandler = (value) => {
   dispatch(expenxeAction.setExpeneList([value,...expenseList]))
  };


  ///this is complete profile button
  const ButtonHandler = () => {
    navigat("/contect");
  };

  // this is logout button
  const logoutHandler = () => {
    dispatch(authActions.logOut());
    navigat("/");
    console.log("logign out");
  };



  const shouldShowActivatePremium = () => {
    const totalExpenses = expenseList.reduce(
      (total, item) => total + parseInt(item.price),
      0
    );
    return totalExpenses > 10000;
  };







  return (
    <>
      <button className={classes.lbutton} onClick={logoutHandler}>
        Logout
      </button>
      {shouldShowActivatePremium() && (
        <button className={classes.activatePremium}>
          Activate Premium
        </button>
      )}
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
