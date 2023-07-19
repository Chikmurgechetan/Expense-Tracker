import React, { useState } from "react";
import classes from "./ExpenseForm.module.css"

const ExpenxeForm = (props) =>{
    const [price,setPrice] =useState("");
    const [description,setDescription] =useState("");
    const [category,setCategory] = useState("");
  
    const expenseSubmitHandler = (event) =>{
       event.preventDefault();
       console.log(price,description,category);

     const obj = {
        id : Date.now(),  
        price: price,
        description: description,
        category:category
     };

     props.showList(obj);  

       setPrice('')
       setDescription('')
       setCategory('')
    }

    const priceOnchange = event =>{
        setPrice(event.target.value);
    }
    
    const descriptionOnchange = event =>{
        setDescription(event.target.value);
    }
    
    const CategoryOnchange = event =>{
        setCategory(event.target.value);
    }

    return(
        <>
        <form onSubmit={expenseSubmitHandler} className={classes.expenseForm}>
            <label htmlFor="price">Price:</label>
            <input type="number" id="price" value={price} onChange={priceOnchange} placeholder="product price"/>
            <label htmlFor="description">Description:</label>
            <input type="text" id="description" value={description} onChange={descriptionOnchange}  placeholder="product description"/>
            <label htmlFor="selsect">Category:</label>
            <select id="selsect" value={category} onChange={CategoryOnchange}>
                <option value="select">select one</option>
                <option value="Food">Food</option>
                <option value="Petrol">Petrol</option>
                <option value="Salary">Salary</option>
            </select>
            <button type="submit">ADD Expenxes</button>
        </form>
        </>
    )
};
export default ExpenxeForm;