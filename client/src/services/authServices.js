import axios from '../utils/axios';
import { authRequests } from '../utils/requests';

const { AUTH_VERIFY_URL, SIGNUP_URL, LOGIN_URL, LOGOUT_URL } = authRequests;

export const authVerifyService = async () => {
  try {
    const request = await axios.get(AUTH_VERIFY_URL);
    return request.data;
  } catch (error) {
    console.log(error);
  }
};

export const signupService = async (formData) => {
  try {
    const request = await axios.post(SIGNUP_URL, formData);
    return request.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginService = async (data) => {
  try {
    const request = await axios.post(LOGIN_URL, data);
    return request.data;
  } catch (error) {
    console.log(error);
  }
};

export const logoutService = async () => {
  try {
    const request = await axios.get(LOGOUT_URL);
    return request.data;
  } catch (error) {
    console.log(error);
  }
};
