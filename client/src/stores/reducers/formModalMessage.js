const initialState = "";

const modalMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MODAL_MESSAGE":
      return action.payload;
    default:
      return state;
  }
};

export default modalMessageReducer;
