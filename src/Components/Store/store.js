import { configureStore} from "@reduxjs/toolkit";

import authoReducer from "./Reduers/Autho-reducers";
import expenseReducer from "./Reduers/Expense-reducer";

const store = configureStore({
  reducer: {auth:authoReducer, expenes:expenseReducer},
});



export default store;
