import {
  chatDataService,
  findUsersService,
  sendMsgService,
} from '../../services/chat';
import { USERS_FOUND, SET_CURRENT_CHAT, SEND_MSG } from '../constants/chat';

export const chatDataAction = () => {
  return async (dispatch) => {
    const response = await chatDataService();
    const { success, contacts } = response;

    if (success === true) {
      return dispatch({
        type: '@chat/ALL_DATA',
        payload: contacts,
      });
    }
  };
};

export const findUsersAction = (value = '') => {
  return async (dispatch) => {
    if (value === '') {
      return dispatch({
        type: USERS_FOUND,
        payload: [],
      });
    }

    const response = await findUsersService(value);
    const { success, usersFound } = response;

    if (success !== true) {
      return;
    }

    if (usersFound.length < 1) {
      return dispatch({
        type: USERS_FOUND,
        payload: [{ msg: 'Not found' }],
      });
    }

    dispatch({
      type: USERS_FOUND,
      payload: usersFound,
    });
  };
};

export const setCurrentChatAction = (user) => ({
  type: SET_CURRENT_CHAT,
  payload: user,
});

export const closeCurrentChatAction = () => ({
  type: SET_CURRENT_CHAT,
  payload: {},
});

export const sendMsgAction = (data) => {
  return async (dispatch) => {
    const response = await sendMsgService(data);
    console.log(response);
    // const { success, msg } = response;

    // if (success === true) {
    //   dispatch({
    //     type: SEND_MSG,
    //     payload: msg,
    //   });
    // }
  };
};
