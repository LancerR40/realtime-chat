import axios from '../utils/api/axios';

export const isAuthService = async () => {
  try {
    const request = await axios.get('/auth');
    return request.data;
  } catch (error) {
    console.log(error);
  }
};

export const signupService = async (data) => {
  try {
    const request = await axios.post('/auth/signup', data);
    return request.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginService = async (data) => {
  try {
    const request = await axios.post('/auth/login', data);
    return request.data;
  } catch (error) {
    console.log(error);
  }
};

export const logoutService = async () => {
  try {
    const request = await axios.get('/auth/logout');
    return request.data;
  } catch (error) {
    console.log(error);
  }
};
