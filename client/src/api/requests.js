export const AUTH_REQUESTS = {
  IS_AUTH: '/auth',
  SIGNUP: '/auth/signup',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
};

export const CHAT_REQUESTS = {
  GET_CHAT_DATA: '/chat',
  SEND_MSG_TO_USER: '/chat/message',
  FIND_USERS: (fullname) => '/chat/user/' + fullname,
};
