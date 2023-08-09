import React, { useState } from "react";
import classes from "./ExpenseFormList.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { expenxeAction } from "../Store/Reduers/Expense-reducer";

const ExpenseList = () => {
  const [edit, setEdit] = useState({
    id: null,
    price: "",
    description: "",
    category: "",
  });

  const dispatch = useDispatch();
  const expenseList = useSelector((state) => state.expenes.expeneseList);

  const totalPrice = expenseList.reduce((init, item) => {
    return (init += parseInt(item.price));
  }, 0);

  const email = localStorage.getItem("email");
  const updatedEmail = email ? email.replace("@", "").replace(".", "") : "";

  const deleteHandler = (id) => {
    dispatch(
      expenxeAction.setExpeneList(expenseList.filter((item) => item.id !== id))
    );

    fetch(
      `https://expense-tracker-b56f7-default-rtdb.firebaseio.com/${updatedEmail}/${id}.json`,
      {
        method: "DELETE",
      }
    )
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
    const expenseItem = expenseList.find((item) => item.id === id);
    setEdit({
      id,
      price: expenseItem.price,
      description: expenseItem.description,
      category: expenseItem.category,
    });
  };

  const saveHandler = (id) => {
    const editedData = {
      price: edit.price,
      description: edit.description,
      category: edit.category,
    };

    fetch(
      `https://expense-tracker-b56f7-default-rtdb.firebaseio.com/${updatedEmail}/${id}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to edit the expense.");
        }

        dispatch(
          expenxeAction.setExpeneList(
            expenseList.map((item) =>
              item.id === id ? { ...item, ...editedData } : item
            )
          )
        );

        // Clear the edit state
        setEdit({ id: null, price: "", description: "", category: "" });

        // Remove the editData from localStorage after saving the data
        localStorage.removeItem("editData");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ul className={classes.maneList}>
      {expenseList.map((item) => (
        <li key={item.id} className={classes.list}>
          {!edit.id || edit.id !== item.id ? (
            <>
              {item.price} - {item.description} - {item.category} -
              <button
                className={classes.deletbtn}
                onClick={() => deleteHandler(item.id)}
              >
                <DeleteIcon /> Delete
              </button>
              <button
                className={classes.deletbtn}
                onClick={() => editHandler(item.id)}
              >
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
                onChange={(e) =>
                  setEdit({ ...edit, description: e.target.value })
                }
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
              <button
                className={classes.deletbtn}
                onClick={() => saveHandler(item.id)}
              >
                <EditIcon /> Save
              </button>
            </>
          )}
        </li>
      ))}
      <h6 className={classes.total}>Total Expense Amount : Rs-{totalPrice}</h6>
    </ul>
  );
};

export default ExpenseList;
