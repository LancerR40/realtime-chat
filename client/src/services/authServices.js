import axios from '../utils/axios';
import base64ToFile from '../utils/base64ToFile';

const SIGNUP_BASE_URL = '/auth/signup';
const LOGIN_BASE_URL = '/auth/login';

export const signupService = async (data) => {
  const { fullname, email, password, avatar } = data;
  const formData = new FormData();

  formData.append('userFullname', fullname);
  formData.append('userEmail', email);
  formData.append('userPassword', password);
  formData.append('userAvatar', await base64ToFile(avatar));

  try {
    const request = await axios.post(SIGNUP_BASE_URL, formData, {
      withCredentials: true,
    });
    return request.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginService = async (data) => {
  try {
    const request = await axios.post(LOGIN_BASE_URL, data, {
      withCredentials: true,
    });
    return request.data;
  } catch (error) {
    console.log(error);
  }
};
