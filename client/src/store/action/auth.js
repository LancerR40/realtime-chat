import authServices from '../../api/services/auth';
import { AUTH_CONSTANTS } from '../constant/auth';
import { CHAT_CONSTANTS } from '../constant/chat';
import { LOADER_CONSTANTS } from '../constant/loader';

export const isAuthAction = () => {
  return async (dispatch) => {
    const response = await authServices.isAuthService();
    const { auth, error } = response;

    if (error) {
      return localStorage.removeItem('token');
    }

    dispatch({
      type: AUTH_CONSTANTS.AUTH_VERIFY,
      payload: auth,
    });
  };
};

export const signupAction = (data, setData) => {
  return async (dispatch) => {
    dispatch({
      type: LOADER_CONSTANTS.SIGNUP_LOADER,
      payload: true,
    });

    const { msg, error } = await authServices.signupService(data);

    dispatch({
      type: LOADER_CONSTANTS.SIGNUP_LOADER,
      payload: false,
    });

    if (error) {
      return alert(error);
    }

    setData({
      fullname: '',
      email: '',
      password: '',
      avatar: null,
    });

    alert(msg);
  };
};

export const loginAction = (data, push) => {
  return async (dispatch) => {
    const { auth, token, error } = await authServices.loginService(data);

    if (error) {
      return alert(error);
    }

    if (auth) {
      localStorage.setItem('token', token);

      push('/chat');

      dispatch({
        type: AUTH_CONSTANTS.LOGIN,
        payload: auth,
      });
    }
  };
};

export const logoutAction = (push, socket) => {
  return async (dispatch) => {
    const { auth, error } = await authServices.logoutService();

    if (error) {
      return alert(error);
    }

    localStorage.removeItem('token');

    socket.emit('chat:logout');

    push('/');

    dispatch({
      type: CHAT_CONSTANTS.CLEAN_CHAT_SESSION,
      payload: {
        user: '',
        currentChat: {},
        usersFound: [],
        contacts: [],
      },
    });

    return dispatch({
      type: AUTH_CONSTANTS.LOGOUT,
      payload: auth,
    });
  };
};
