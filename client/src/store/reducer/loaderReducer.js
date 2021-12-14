const initialState = {
  signupLoader: false,
  loginLoader: false,
};

const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case '@loader/SIGNUP_LOADER':
      return { ...state, signupLoader: action.payload };

    default:
      return state;
  }
};

export default loaderReducer;
