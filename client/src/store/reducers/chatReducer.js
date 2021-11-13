const initialState = {
  currentChat: {},
  usersFound: [],
  contacts: [],
};

const chatReducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case '@chat/ALL_DATA':
      return { ...state, contacts: payload };

    case '@chat/USERS_FOUND':
      return { ...state, usersFound: payload };

    case '@chat/SET_CURRENT_CHAT':
      return { ...state, currentChat: payload };

    case '@chat/SEND_MSG': {
      if (!state.currentChat.chat) {
        return {
          ...state,
          currentChat: {
            ...state.currentChat,
            chat: [payload],
          },
        };
      }

      return {
        ...state,
        currentChat: {
          ...state.currentChat,
          chat: state.currentChat?.chat.concat(payload),
        },
      };
    }

    default:
      return state;
  }
};

export default chatReducer;
