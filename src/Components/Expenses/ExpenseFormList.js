import React, { useContext, useState } from "react";
import classes from "./ExpenseFormList.module.css";
import { AppContext } from "../Context/Autho-Context";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ExpenseList = () => {
  const ctx = useContext(AppContext);
  const expenseLists = ctx.expenseLists;
  const [edit, setEdit] = useState({ id: null, price: "", description: "", category: "" });

  const totalPrice = expenseLists.reduce((init, item) => {
    return (init += parseInt(item.price));
  }, 0);

  const email = localStorage.getItem("email");
  const updatedEmail = email ? email.replace("@", "").replace(".", "") : "";

  const deleteHandler = (id) => {
    ctx.setExpenseLists((prevList) => {
      return prevList.filter((newItem) => newItem.id !== id);
    });

    fetch(`https://expense-tracker-b56f7-default-rtdb.firebaseio.com/${updatedEmail}/${id}.json`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete the expense.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const editHandler = (id) => {
    const expenseItem = expenseLists.find((item) => item.id === id);
    setEdit({ id, price: expenseItem.price, description: expenseItem.description, category: expenseItem.category });
  };

  const saveHandler = (id) => {
    const editedData = {
      price: edit.price,
      description: edit.description,
      category: edit.category,
    };

    fetch(`https://expense-tracker-b56f7-default-rtdb.firebaseio.com/${updatedEmail}/${id}.json`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to edit the expense.");
        }
        setEdit({ id: null, price: "", description: "", category: "" });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ul className={classes.maneList}>
      {expenseLists.map((item) => (
        <li key={item.id} className={classes.list}>
          {!edit.id || edit.id !== item.id ? (
            <>
              {item.price} - {item.description} - {item.category} -
              <button className={classes.deletbtn} onClick={() => deleteHandler(item.id)}>
                <DeleteIcon /> Delete
              </button>
              <button className={classes.deletbtn} onClick={() => editHandler(item.id)}>
                <EditIcon /> Edit
              </button>
            </>
          ) : (
            <>
              <input
                type="number"
                placeholder="add price"
                value={edit.price}
                onChange={(e) => setEdit({ ...edit, price: e.target.value })}
              />
              <input
                type="text"
                placeholder="add description"
                value={edit.description}
                onChange={(e) => setEdit({ ...edit, description: e.target.value })}
              />
              <select
                id="select"
                value={edit.category}
                onChange={(e) => setEdit({ ...edit, category: e.target.value })}
              >
                <option value="select">select one</option>
                <option value="Food">Food</option>
                <option value="Petrol">Petrol</option>
                <option value="Salary">Salary</option>
              </select>
              <button className={classes.deletbtn} onClick={() => saveHandler(item.id)}>
                <EditIcon /> Save
              </button>
            </>
          )}
        </li>
      ))}
      <h3 className={classes.total}>Total Expense Amount : Rs-{totalPrice}</h3>
    </ul>
  );
};

export default ExpenseList;
