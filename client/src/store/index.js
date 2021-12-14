import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/authReducer';
import chatReducer from './reducer/chatReducer';
import loaderReducer from './reducer/loaderReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    loader: loaderReducer,
  },
});

export default store;
