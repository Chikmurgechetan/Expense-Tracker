import React from "react";
import classes from "./ExpenseFormList.module.css";
const ExpenseList = (props) =>{
    return(
       <ul className={classes.maneList}>
        {
           props.lists.map((item)=>{
             return <li key={item.id} className={classes.list}>
                   {item.price}-{item.description}-{item.category}
             </li>
           })
        }
       </ul>   

     
    )
};
export default ExpenseList;