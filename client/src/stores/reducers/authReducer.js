const initialState = {
  isLoggedIn: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isLoggedIn: true };
    case "LOGOUT":
      localStorage.clear();
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
};

export default authReducer;
