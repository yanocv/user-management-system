const initialState = {
  employeeList: [],
};

export default function employeeListReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_EMPLOYEE_LIST":
      return {
        ...state,
        employeeList: action.payload ? action.payload : state.employeeList,
      };
    case "UPDATE_EMPLOYEE_LIST":
      return {
        ...state,
        employeeList: action.payload,
      };

    default:
      return state;
  }
}
