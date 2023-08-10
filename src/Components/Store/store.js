import { configureStore} from "@reduxjs/toolkit";

import authoReducer from "./Reduers/Autho-reducers";
import expenseReducer from "./Reduers/Expense-reducer";
import themReducer from "./Reduers/Them-reducers";

const store = configureStore({
  reducer: {auth:authoReducer, expenes:expenseReducer, them:themReducer},
});



export default store;
