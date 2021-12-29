const loaderReducer = (state = false, action) => {
  switch (action.type) {
    case '@loader/LOADER':
      return action.payload;

    default:
      return state;
  }
};

export default loaderReducer;
