import {
  chatDataService,
  findUsersService,
  sendMsgService,
} from '../../services/chat';
import { USERS_FOUND, SET_CURRENT_CHAT, SEND_MSG } from '../constants/chat';

export const chatDataAction = () => {
  return async (dispatch) => {
    const response = await chatDataService();
    const { success, contacts, user } = response;

    if (success === true) {
      return dispatch({
        type: '@chat/ALL_DATA',
        payload: {
          contacts,
          user: user.avatar,
        },
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

export const sendMsgAction = (data, msgRef, socket) => {
  return async (dispatch) => {
    const response = await sendMsgService(data);
    const { success, msg } = response;

    if (success === true) {
      socket.emit('chat:msg', data);

      dispatch({
        type: SEND_MSG,
        payload: msg,
      });

      // Reset msg input
      msgRef.current.value = '';
    }
  };
};

export const msgFromServerAction = (data) => ({
  type: 'MSG_FROM_SERVER',
  payload: data,
});
