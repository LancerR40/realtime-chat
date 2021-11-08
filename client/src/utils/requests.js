export const authRequests = {
  AUTH_VERIFY_URL: '/auth',
  SIGNUP_URL: '/auth/signup',
  LOGIN_URL: '/auth/login',
  LOGOUT_URL: '/auth/logout',
};

export const findRequests = {
  FIND_USER_URL: (name) => '/user/find/' + name,
};
