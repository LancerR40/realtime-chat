import AuthService from '../services/auth';

export const isAuthController = (req, res) => {
  // const { token } = req.cookies;
  const token = req.headers['x-token'];

  if (!token || token == 'null') {
    return res.status(200).json({ auth: false });
  }

  try {
    const auth = new AuthService();
    const { status } = auth.isAuth(token);

    if (status === true) {
      res.status(200).json({ auth: true });
    }
  } catch (error) {
    res.status(403).json({ error: 'Authorization failed' });
  }
};

export const signupController = async (req, res) => {
  const { fullname, email, password } = req.body;
  const { avatar } = req.files;

  const newUser = {
    fullname,
    email,
    password,
    avatar,
  };

  try {
    const auth = new AuthService();
    const { isUserExist, status } = await auth.signup(newUser);

    if (isUserExist) {
      return res.status(400).json({ error: 'User already exists' });
    }

    if (status === true) {
      return res.status(200).json({ msg: 'User registered successfully' });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const loginController = async (req, res) => {
  try {
    const auth = new AuthService();
    const { token, error } = await auth.login(req.body);

    if (error) {
      return res.status(400).json({ error });
    }

    if (token) {
      res.status(200).json({ auth: true, token });
      // return res.status(200).cookie('token', token).json({ auth: true });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const logoutController = (_req, res) => {
  //  res.status(200).clearCookie('token').json({ auth: false });
};
