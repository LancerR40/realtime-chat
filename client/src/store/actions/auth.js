import {
  isAuthService,
  signupService,
  loginService,
  logoutService,
} from '../../services/auth';
import { AUTH_VERIFY, LOGIN, LOGOUT, LOADING_STATUS } from '../constants/auth';

export const isAuthAction = () => {
  return async (dispatch) => {
    const response = await isAuthService();
    const { auth, error } = response;

    if (error) {
      return alert(error);
    }

    dispatch({
      type: AUTH_VERIFY,
      payload: auth,
    });
  };
};

export const signupAction = (data, setData, setPreviewAvatar) => {
  return async (dispatch) => {
    dispatch({
      type: LOADING_STATUS,
      payload: true,
    });

    const { msg, error } = await signupService(data);

    dispatch({
      type: LOADING_STATUS,
      payload: false,
    });

    if (error) {
      return alert(error);
    }

    setData({
      fullname: '',
      email: '',
      password: '',
    });

    setPreviewAvatar(null);

    alert(msg);
  };
};

export const loginAction = (data, push) => {
  return async (dispatch) => {
    const { auth, token, error } = await loginService(data);

    if (error) {
      return alert(error);
    }

    if (auth) {
      // Set token in localstorage
      localStorage.setItem('token', token);

      push('/chat');

      dispatch({
        type: LOGIN,
        payload: auth,
      });
    }
  };
};

export const logoutAction = (push) => {
  return async (dispatch) => {
    localStorage.removeItem('token');

    push('/');

    return dispatch({
      type: LOGOUT,
      payload: false,
    });

    // const { auth } = await logoutService();

    // if (!auth) {
    //   push('/');

    //   return dispatch({
    //     type: LOGOUT,
    //     payload: auth,
    //   });
    // }
  };
};
