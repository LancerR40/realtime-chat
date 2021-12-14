import axios from '../axios';
import { CHAT_REQUESTS } from '../requests';

export const getUserDataService = async () => {
  try {
    const request = await axios.get(CHAT_REQUESTS.GET_CHAT_DATA, {
      headers: {
        'X-Token': localStorage.getItem('token'),
      },
    });
    return request.data;
  } catch (error) {
    return { error };
  }
};

export const sendMsgToUserService = async (data) => {
  try {
    const request = await axios.post(CHAT_REQUESTS.SEND_MSG_TO_USER, data, {
      headers: {
        'X-Token': localStorage.getItem('token'),
      },
    });
    return request.data;
  } catch (error) {
    return { error };
  }
};

export const findUsersService = async (fullname) => {
  try {
    const request = await axios.get(CHAT_REQUESTS.FIND_USERS(fullname), {
      headers: {
        'X-Token': localStorage.getItem('token'),
      },
    });
    return request.data;
  } catch (error) {
    console.log(error);
  }
};

export default { getUserDataService, sendMsgToUserService, findUsersService };
