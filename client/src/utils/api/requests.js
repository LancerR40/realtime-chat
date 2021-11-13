export const findRequests = {
  FIND_USER_URL: (name) => '/user/find/' + name,
};

export const chatRequests = {
  SEND_MSG_URL: (id) => '/chat/user/' + id + '/msg',
};

export const authRequests = {
  AUTH: '/auth',
  SIGNUP: '/auth/signup',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
};
