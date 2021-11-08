import { findUserService } from '../../services/findService';

export const findUserAction = (name) => {
  return async (dispatch) => {
    if (name === '') {
      return dispatch({
        type: '@chat/usersFound',
        payload: [],
      });
    }

    const response = await findUserService(name);
    const { success, users } = response;

    if (success !== true) {
      return;
    }

    if (users.length < 1) {
      return dispatch({
        type: '@chat/usersFound',
        payload: [{ msg: 'Not found' }],
      });
    }

    return dispatch({
      type: '@chat/usersFound',
      payload: response.users,
    });
  };
};
