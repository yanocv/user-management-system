const initialState = {
  topicsData: [],
};

const topicsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TOPICS_DATA":
      return {
        ...state,
        topicsData: action.payload,
      };
    default:
      return state;
  }
};

export default topicsReducer;
