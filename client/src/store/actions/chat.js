import {
  chatDataService,
  findUsersService,
  sendMsgService,
} from '../../services/chat';
import {
  ALL_DATA,
  USERS_FOUND,
  SET_CURRENT_CHAT,
  SEND_MSG,
  MSG_FROM_SERVER,
} from '../constants/chat';

export const chatDataAction = () => {
  return async (dispatch) => {
    const response = await chatDataService();
    const { user, contacts, error } = response;

    if (error) {
      return alert('Internal error');
    }

    return dispatch({
      type: ALL_DATA,
      payload: {
        contacts,
        user: user.avatar,
      },
    });
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

    const { usersFound } = await findUsersService(value);

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
    const { msg } = await sendMsgService(data);

    // Send msg to socket server
    socket.emit('chat:msg', data);

    dispatch({
      type: SEND_MSG,
      payload: msg,
    });

    msgRef.current.value = '';
  };
};

export const msgFromServerAction = (data) => ({
  type: MSG_FROM_SERVER,
  payload: data,
});
