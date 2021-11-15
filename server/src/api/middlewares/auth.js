import { verifyJWT } from '../utils/jsonwebtoken';

export const isAuth = (req, res, next) => {
  // const { token } = req.cookies;
  const token = req.headers['x-token'];

  if (!token || token == 'null') {
    return res.status(403).json({
      error: 'Authorization failed',
    });
  }

  if (token) {
    try {
      const payload = verifyJWT(token);
      req.user = payload;

      next();
    } catch (error) {
      return res.status(403).json({
        error: 'Authorization failed',
      });
    }
  }
};
