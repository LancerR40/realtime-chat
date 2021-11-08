import { verifyJWT } from '../utils/jsonwebtoken';

export const isAuth = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({
      success: false,
      auth: false,
      msg: 'Authentication failed',
    });
  }

  if (token) {
    try {
      const payload = verifyJWT(token);
      req.user = payload;

      next();
    } catch (error) {
      return res.json({
        success: false,
        auth: false,
        msg: 'Authentication failed',
      });
    }
  }
};
