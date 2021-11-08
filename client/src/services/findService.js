import axios from '../utils/axios';
import { findRequests } from '../utils/requests';

const { FIND_USER_URL } = findRequests;

export const findUserService = async (name) => {
  try {
    const request = await axios.get(FIND_USER_URL(name));
    return request.data;
  } catch (error) {
    console.log(error);
  }
};
