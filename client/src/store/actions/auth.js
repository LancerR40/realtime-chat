import {
  isAuthService,
  signupService,
  loginService,
  logoutService,
} from '../../services/auth';
import { AUTH_VERIFY, SIGNUP, LOGOUT, LOGIN } from '../constants/auth';

export const isAuthAction = () => {
  return async (dispatch) => {
    const response = await isAuthService();
    const { success, auth } = response;

    if (success !== true) {
      return;
    }

    dispatch({
      type: AUTH_VERIFY,
      payload: auth,
    });
  };
};

export const signupAction = (data) => {
  return async (dispatch) => {
    const response = await signupService(data);
    console.log(response);
    const { success: status, msg } = response;

    if (status !== true) {
      // Display error msg
      return;
    }

    dispatch({
      type: SIGNUP,
      payload: {
        onSuccess: {
          status,
          msg,
        },
      },
    });
  };
};

export const loginAction = (data, push) => {
  return async (dispatch) => {
    const response = await loginService(data);
    const { success, auth } = response;
    if (success !== true) {
      // Display error msg
      return;
    }

    push('/chat');

    // In construction
    dispatch({
      type: LOGIN,
      payload: auth,
    });
  };
};

export const logoutAction = (push) => {
  return async (dispatch) => {
    const response = await logoutService('GET', '/auth/logout');
    const { auth } = response;

    push('/');

    return dispatch({
      type: LOGOUT,
      payload: auth,
    });
  };
};
