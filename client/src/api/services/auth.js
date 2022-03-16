import axios from '../axios'
import { AUTH_REQUESTS } from '../requests'

const isAuthService = async () => {
  try {
    const request = await axios.get(AUTH_REQUESTS.IS_AUTH, {
      headers: {
        'X-Token': window.localStorage.getItem('token'),
      },
    })
    return request.data
  } catch (error) {
    return { error: error.response.data.error }
  }
}

const signupService = async (data) => {
  try {
    const request = await axios.post(AUTH_REQUESTS.SIGNUP, data)
    return request.data
  } catch (error) {
    if (error.response.data.error) {
      return { error: error.response.data.error }
    }

    return { error: 'Connection to server failed, check network' }
  }
}

const loginService = async (data) => {
  try {
    const request = await axios.post(AUTH_REQUESTS.LOGIN, data)
    return request.data
  } catch (error) {
    if (error.response.data.error) {
      return { error: error.response.data.error }
    }

    return { error: 'Connection to server failed, check network' }
  }
}

const logoutService = async () => {
  try {
    const headers = {
      'X-Token': window.localStorage.getItem('token'),
    }

    const request = await axios.get(AUTH_REQUESTS.LOGOUT, {
      headers,
    })
    return request.data
  } catch (error) {
    return { error: 'Connection to server failed, check network' }
  }
}

export default { isAuthService, signupService, loginService, logoutService }
