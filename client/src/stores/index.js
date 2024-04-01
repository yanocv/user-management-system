import { createStore, combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import topicsReducer from "./reducers/topicsReducers";
import employeeListReducer from "./reducers/employeeListReducer";
import toastReducer from "./toast/reducer";
import employeeIdReducer from "./reducers/employeeIdReducer";
import formModalMessageReducer from "./reducers/formModalMessage";

const rootReducer = combineReducers({
  auth: authReducer,
  topics: topicsReducer,
  employeeList: employeeListReducer,
  toast: toastReducer,
  employeeId: employeeIdReducer,
  formModalMessage: formModalMessageReducer,
});

const store = createStore(rootReducer);

export default store;
