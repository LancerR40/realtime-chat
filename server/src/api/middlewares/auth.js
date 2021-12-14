import { verifyJWT } from '../utils/jsonwebtoken';

export const isAuth = (req, res, next) => {
  const token = req.headers['x-token'];

  if (!token || token == 'null') {
    return res.status(403).json({
      error: 'No authorization',
    });
  }

  try {
    const payload = verifyJWT(token);
    req.user = payload;

    next();
  } catch (error) {
    res.status(403).json({
      error: 'No authorization',
    });
  }
};
