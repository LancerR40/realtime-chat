import axios from '../axios'
import { CHAT_REQUESTS } from '../requests'

export const getUserDataService = async () => {
  try {
    const headers = {
      'X-Token': window.localStorage.getItem('token'),
    }

    const request = await axios.get(CHAT_REQUESTS.GET_CHAT_DATA, {
      headers,
    })
    return request.data
  } catch (error) {
    return { error }
  }
}

export const sendMessageService = async (data) => {
  try {
    const headers = {
      'X-Token': window.localStorage.getItem('token'),
    }

    const request = await axios.post(CHAT_REQUESTS.SEND_MSG_TO_USER, data, {
      headers,
    })
    return request.data
  } catch (error) {
    return { error }
  }
}

export const findUsersService = async (fullname) => {
  try {
    const headers = {
      'X-Token': window.localStorage.getItem('token'),
    }

    const request = await axios.get(CHAT_REQUESTS.FIND_USERS(fullname), {
      headers,
    })
    return request.data
  } catch (error) {
    return error
  }
}

export default { getUserDataService, sendMessageService, findUsersService }
