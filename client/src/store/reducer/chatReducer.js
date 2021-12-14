const initialState = {
  user: '',
  currentChat: {},
  usersFound: [],
  contacts: [],
};

const chatReducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case '@chat/GET_USER_DATA':
      return { ...state, contacts: payload.contacts, user: payload.user };

    case '@chat/USERS_FOUND':
      return { ...state, usersFound: payload };

    case '@chat/SET_CURRENT_CHAT':
      return { ...state, currentChat: payload };

    case '@chat/CLEAN_CHAT_SESSION':
      return payload;

    case '@chat/SEND_MSG_TO_USER': {
      const { incomingUserId, isContact } = payload;

      if (isContact === false) {
        const newContact = {
          ...state.currentChat,
          chat: [payload],
        };

        const newState = {
          ...state,
          contacts: [...state.contacts, newContact],
          currentChat: {
            ...state.currentChat,
            chat: [payload],
          },
        };

        return newState;
      }

      const contactIndex = state.contacts.findIndex(
        (contact) => contact.id === incomingUserId
      );

      const contacts = Object.values({
        ...state.contacts,
        [contactIndex]: {
          ...state.contacts[contactIndex],
          chat: state.contacts[contactIndex].chat.concat(payload),
        },
      });

      const newState = {
        ...state,
        currentChat: {
          ...state.currentChat,
          chat: state.currentChat.chat.concat(payload),
        },
        contacts,
      };

      return newState;
    }

    case '@chat/USER_MSG_FROM_SERVER': {
      const { outgoingUser, incomingUser, content, datetime } = action.payload;

      const { id: outgoingUserId, fullname, email, avatar } = outgoingUser;
      const { id: incomingUserId } = incomingUser;

      const isContact = state.contacts.findIndex(
        ({ id }) => id === outgoingUserId
      );

      const newMsg = {
        outgoingUserId,
        incomingUserId,
        content,
        datetime,
      };

      if (isContact === -1) {
        const newContact = {
          id: outgoingUserId,
          fullname,
          email,
          avatar,
          chat: [newMsg],
        };

        if (Object.keys(state.currentChat).length > 0) {
          const newState = {
            ...state,
            contacts: [...state.contacts, newContact],
            currentChat: {
              ...state.currentChat,
              chat: [newMsg],
            },
          };

          return newState;
        }

        const newState = {
          ...state,
          contacts: [...state.contacts, newContact],
        };

        return newState;
      }

      const contacts = Object.values({
        ...state.contacts,
        [isContact]: {
          ...state.contacts[isContact],
          chat: state.contacts[isContact].chat.concat(newMsg),
        },
      });

      if (Object.keys(state.currentChat).length > 0) {
        const newState = {
          ...state,
          currentChat: {
            ...state.currentChat,
            chat: state.currentChat.chat.concat(newMsg),
          },
          contacts,
        };

        return newState;
      }

      const newState = {
        ...state,
        contacts,
      };

      return newState;
    }

    default:
      return state;
  }
};

export default chatReducer;