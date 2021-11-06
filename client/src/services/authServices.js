import axios from 'axios';
import base64ToFile from '../utils/base64ToFile';

// Origin
const BASE_URL = 'http://localhost:8080/api/auth';

const SIGNUP_BASE_URL = BASE_URL + '/signup';

export const signupService = async (data) => {
  const { fullname, email, password, avatar } = data;
  const formData = new FormData();

  formData.append('userFullname', fullname);
  formData.append('userEmail', email);
  formData.append('userPassword', password);
  formData.append('userAvatar', await base64ToFile(avatar));

  const request = await axios.post(SIGNUP_BASE_URL, formData);
  return request.data;
};
