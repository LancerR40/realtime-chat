import axios from '../utils/api/axios';

export const chatDataService = async () => {
  try {
    const request = await axios.get('/chat', {
      headers: {
        'X-Token': localStorage.getItem('token'),
      },
    });
    return request.data;
  } catch (error) {
    console.log(error);
  }
};

export const sendMsgService = async (data) => {
  try {
    const request = await axios.post('/chat/message', data, {
      headers: {
        'X-Token': localStorage.getItem('token'),
      },
    });
    return request.data;
  } catch (error) {
    console.log(error);
  }
};

export const findUsersService = async (value) => {
  try {
    const request = await axios.get(`/chat/user/${value}`, {
      headers: {
        'X-Token': localStorage.getItem('token'),
      },
    });
    return request.data;
  } catch (error) {
    console.log(error);
  }
};
