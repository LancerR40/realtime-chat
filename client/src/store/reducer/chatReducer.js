import { CHAT_CONSTANTS } from '../constant/chat';

const initialState = {
  user: '',
  currentChat: {},
  usersFound: [],
  contacts: [],
};

const chatReducer = (state = initialState, action) => {
  const { payload } = action;

  switch (action.type) {
    case CHAT_CONSTANTS.GET_USER_DATA:
      return { ...state, contacts: payload.contacts, user: payload.user };

    case CHAT_CONSTANTS.USERS_FOUND:
      return { ...state, usersFound: payload };

    case CHAT_CONSTANTS.SET_CURRENT_CHAT:
      return { ...state, currentChat: payload };

    case CHAT_CONSTANTS.CLEAN_CHAT_SESSION:
      return payload;

    case CHAT_CONSTANTS.SEND_MSG_TO_USER: {
      const { incomingUserId, isContact } = payload;

      if (!isContact) {
        const newContact = {
          ...state.currentChat,
          chat: [payload],
        };

        const contacts = [...state.contacts, newContact];

        return {
          ...state,
          currentChat: newContact,
          contacts,
        };
      }

      const contacts = [...state.contacts];
      const findContactIndex = contacts.findIndex(
        ({ id }) => id === incomingUserId
      );

      delete payload.isContact;

      const updatedContacts = Object.values({
        ...state.contacts,
        [findContactIndex]: {
          ...state.contacts[findContactIndex],
          chat: state.contacts[findContactIndex].chat.concat(payload),
        },
      });

      const currentChat = {
        ...state.currentChat,
        chat: state.currentChat.chat.concat(payload),
      };

      return {
        ...state,
        currentChat,
        contacts: updatedContacts,
      };
    }

    case CHAT_CONSTANTS.USER_MSG_FROM_SERVER: {
      const { outgoingUser, message } = action.payload;

      const isContact = state.contacts.findIndex(
        (contact) => contact.id === outgoingUser.id
      );

      if (isContact === -1) {
        const newContact = {
          ...outgoingUser,
          chat: [message],
        };

        const isCurrentChat = state.currentChat?.id === outgoingUser.id;

        if (isCurrentChat) {
          const newState = {
            ...state,
            contacts: [...state.contacts, newContact],
            currentChat: {
              ...state.currentChat,
              chat: [message],
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
          chat: state.contacts[isContact].chat.concat(message),
        },
      });

      const isCurrentChat = state.currentChat?.id === outgoingUser.id;

      if (isCurrentChat) {
        const newState = {
          ...state,
          currentChat: {
            ...state.currentChat,
            chat: state.currentChat.chat.concat(message),
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
