import { authVerifyService, logoutService } from '../../services/authServices';

export const authVerifyAction = () => {
  return async (dispatch) => {
    const response = await authVerifyService();

    return dispatch({
      type: '@auth/verify',
      payload: response.auth,
    });
  };
};

export const loginAction = (auth) => ({
  type: '@auth/login',
  payload: auth,
});

export const logoutAction = () => {
  return async (dispatch) => {
    const response = await logoutService();

    return dispatch({
      type: '@auth/logout',
      payload: response.auth,
    });
  };
};
