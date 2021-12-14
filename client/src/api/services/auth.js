import axios from '../axios';
import { AUTH_REQUESTS } from '../requests';

const isAuthService = async () => {
  try {
    const request = await axios.get(AUTH_REQUESTS.IS_AUTH, {
      headers: {
        'X-Token': localStorage.getItem('token'),
      },
    });
    return request.data;
  } catch (error) {
    return { error: error.response.data.error };
  }
};

const signupService = async (data) => {
  try {
    const request = await axios.post(AUTH_REQUESTS.SIGNUP, data);
    return request.data;
  } catch (error) {
    return { error: error.response.data.error };
  }
};

const loginService = async (data) => {
  try {
    const request = await axios.post(AUTH_REQUESTS.LOGIN, data);
    return request.data;
  } catch (error) {
    return { error: error.response.data.error };
  }
};

const logoutService = async () => {
  try {
    const request = await axios.get(AUTH_REQUESTS.LOGOUT, {
      headers: {
        'X-Token': localStorage.getItem('token'),
      },
    });
    return request.data;
  } catch (error) {
    return { error: error.response.data.error };
  }
};

export default { isAuthService, signupService, loginService, logoutService };
