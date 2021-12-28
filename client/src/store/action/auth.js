import authServices from '../../api/services/auth';
import { AUTH_CONSTANTS } from '../constant/auth';
import { CHAT_CONSTANTS } from '../constant/chat';
import { LOADER_CONSTANTS } from '../constant/loader';

export const isAuthAction = () => {
  return async (dispatch) => {
    const response = await authServices.isAuthService();
    const { auth, error } = response;

    if (error) {
      const token = window.localStorage.getItem('token');

      if (token !== null) {
        window.localStorage.removeItem('token');
      }

      return;
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

    const { message, error } = await authServices.signupService(data);

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

    alert(message);
  };
};

export const loginAction = (data, push) => {
  return async (dispatch) => {
    dispatch({
      type: LOADER_CONSTANTS.SIGNUP_LOADER,
      payload: true,
    });

    const { auth, token, error } = await authServices.loginService(data);

    dispatch({
      type: LOADER_CONSTANTS.SIGNUP_LOADER,
      payload: false,
    });

    if (error) {
      return alert(error);
    }

    if (auth) {
      window.localStorage.setItem('token', token);

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

    window.localStorage.removeItem('token');

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
