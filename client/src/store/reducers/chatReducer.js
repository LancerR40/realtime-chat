const initialState = {
  usersFound: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case '@chat/usersFound': {
      const { payload } = action;
      return { ...state, usersFound: payload };
    }
    default:
      return state;
  }
};

export default chatReducer;
