import AuthService from '../services/auth';

export const isAuthController = (req, res) => {
  if (req.headers['x-token'] == 'null') {
    return res.status(200).json({ auth: false });
  }

  const token = req.headers['x-token'];

  try {
    const auth = new AuthService();
    const { status } = auth.isAuth(token);

    if (status === true) {
      res.status(200).json({ auth: true });
    }
  } catch (error) {
    res.status(403).json({ error: 'No authorization' });
  }
};

export const signupController = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const { avatar } = req.files;

    const newUser = {
      fullname,
      email,
      password,
      avatar,
    };

    const auth = new AuthService();
    const { isUserExist, status } = await auth.signup(newUser);

    if (isUserExist) {
      return res.status(400).json({ error: 'User already exists' });
    }

    if (status === true) {
      return res.status(200).json({ msg: 'User registered successfully' });
    }
  } catch (error) {
    res.status(400).json({ error: 'An error occurred, restart and try again' });
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
    }
  } catch (error) {
    res.status(400).json({ error: 'An error occurred, restart and try again' });
  }
};

export const logoutController = (req, res) => {
  try {
    const token = req.headers['x-token'];

    const auth = new AuthService();
    auth.logout(token);

    res.status(200).json({ auth: false });
  } catch (error) {
    res.status(400).json({ error: 'An error occurred, restart and try again' });
  }
};
