const initialState = {
  isAuth: false,
  requestData: {
    onSuccess: {
      status: false,
      msg: '',
    },
    error: {
      status: false,
      msg: '',
    },
  },
};

const authReducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case '@auth/AUTH_VERIFY':
      return { ...state, isAuth: payload };

    case '@auth/SIGNUP':
      return { ...state, requestData: { ...state.requestData, ...payload } };

    case '@auth/LOGIN':
      return { ...state, isAuth: payload };

    case '@auth/LOGOUT':
      return { ...state, isAuth: payload };

    default:
      return state;
  }
};

export default authReducer;
