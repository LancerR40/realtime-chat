import chatServices from '../../api/services/chat';
import { CHAT_CONSTANTS } from '../constant/chat';

export const getUserDataAction = () => {
  return async (dispatch) => {
    const response = await chatServices.getUserDataService();
    const { user, error } = response;

    if (error) {
      return alert('Internal error');
    }

    return dispatch({
      type: CHAT_CONSTANTS.GET_USER_DATA,
      payload: {
        contacts: user.contacts,
        user,
      },
    });
  };
};

export const findUsersAction = (value = '') => {
  return async (dispatch) => {
    if (value === '') {
      return dispatch({
        type: CHAT_CONSTANTS.USERS_FOUND,
        payload: [],
      });
    }

    const { usersFound } = await chatServices.findUsersService(value);

    if (usersFound.length) {
      dispatch({
        type: CHAT_CONSTANTS.USERS_FOUND,
        payload: usersFound,
      });
    }
  };
};

export const setCurrentChatAction = (user = {}) => ({
  type: CHAT_CONSTANTS.SET_CURRENT_CHAT,
  payload: user,
});

export const sendMessageAction = (data, socket) => {
  return async (dispatch) => {
    const { message, error } = await chatServices.sendMessageService(data);

    if (error) {
      return alert('Internal error');
    }

    socket.emit('chat:message', data);

    dispatch({
      type: CHAT_CONSTANTS.SEND_MSG_TO_USER,
      payload: message,
    });
  };
};

export const userMsgFromServerAction = (data) => {
  return {
    type: CHAT_CONSTANTS.USER_MSG_FROM_SERVER,
    payload: data,
  };
};

export const updateContactsConnectionAction = (data) => {
  return {
    type: '@chat/UPDATE_CONTACT_CONNECTION',
    payload: data,
  };
};
