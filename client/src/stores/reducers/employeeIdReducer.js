const initialState = null;

const employeeIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_EMPLOYEE_ID":
      return action.payload;
    case "CLEAR_EMPLOYEE_ID":
      return null;
    default:
      return state;
  }
};

export default employeeIdReducer;
