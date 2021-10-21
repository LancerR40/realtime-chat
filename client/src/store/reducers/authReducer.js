const authReducer = (state = false, action) => {
  switch (action.type) {
    case '@auth/login': {
      const { payload } = action;
      return payload;
    }

    case '@auth/verify': {
      const { payload } = action;
      return payload;
    }

    default: {
      return state;
    }
  }
};

export default authReducer;
