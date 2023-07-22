import React, { useContext } from "react";
import classes from "./ExpenseFormList.module.css";
import { AppContext } from "../Context/Autho-Context";

const ExpenseList = (props) => {
  const ctx = useContext(AppContext);
  const expenseLists = ctx.expenseLists;

  return (
    <ul className={classes.maneList}>
      {expenseLists.map((item) => (
        <li key={item.id} className={classes.list}>
          {item.price} - {item.description} - {item.category} -
        </li>
      ))}
    </ul>
  );
};

export default ExpenseList;
