//https://expense-tracker-b56f7-default-rtdb.firebaseio.com
import React, {  useEffect, useState } from "react";
import classes from "./ExpenseForm.module.css";
import { useDispatch } from "react-redux";
import { expenxeAction } from "../Store/Reduers/Expense-reducer";

const email = localStorage.getItem("email");
const updatedEmail = email ? email.replace("@", "").replace(".", "") : "";
const dataToFirebase = async (data) => {
  try {
    const response = await fetch(
      `https://expense-tracker-b56f7-default-rtdb.firebaseio.com/${updatedEmail}.json`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = await response.json();
    console.log("Data added successfully:", responseData);
  } catch (error) {
    console.log("Error adding data:", error);
  }
};

const ExpenseForm = (props) => {
 // const ctx = useContext(AppContext);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  //const [lists,setLists] = useState([]);
  const dispatch = useDispatch()

  const getUserData = async () => {
    try {
      await fetch(
        `https://expense-tracker-b56f7-default-rtdb.firebaseio.com/${updatedEmail}.json`
      )
        .then((response) => {
          if (response.ok) {
            console.log("data is getting nicely");
            return response.json();
          } else {
            throw new Error("Failed to fetch expenses data");
          }
        })
        .then((data) => {
          console.log(data + "we are getting data here guys");
          const FetchDetails = [];
          for (const key in data) {
            FetchDetails.push({
              id: key,
              price: data[key].price,
              description: data[key].description,
              category: data[key].category,
            });
          }
          //ctx.setExpenseLists(FetchDetails);
          dispatch(expenxeAction.setExpeneList(FetchDetails))
          console.log(
            FetchDetails[0].id +
              "here we are getting desc back" +
              FetchDetails[0].price
          );
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch data when the component mounts
    getUserData();
  }, []);

  const expenseSubmitHandler = (event) => {
    event.preventDefault();

    const obj = {
      id: Math.random().toString(),
      price: price,
      description: description,
      category: category,
    };

    // Show the new expense in the list if required (props.showList function should be defined in a parent component)
    if (props.showList) {
      props.showList(obj);
    }

    // Adding data to Firebase
    dataToFirebase(obj);

    // Reset form inputs
    setPrice("");
    setDescription("");
    setCategory("");
  };

  const priceOnchange = (event) => {
    setPrice(event.target.value);
  };

  const descriptionOnchange = (event) => {
    setDescription(event.target.value);
  };

  const CategoryOnchange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <>
      <form onSubmit={expenseSubmitHandler} className={classes.expenseForm}>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={priceOnchange}
          placeholder="product price"
        />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={descriptionOnchange}
          placeholder="product description"
        />
        <label htmlFor="select">Category:</label>
        <select id="select" value={category} onChange={CategoryOnchange}>
          <option value="select">select one</option>
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary</option>
        </select>
        <button type="submit">ADD Expenses</button>
      </form>

    </>
  );
};

export default ExpenseForm;
