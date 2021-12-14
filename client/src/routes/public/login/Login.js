import styles from './Login.module.css';

import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { loginAction } from '../../../store/action/auth';

import Form from '../../../components/form/LoginForm';

const Login = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();

  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const onChange = (event) => {
    const { name, value } = event.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const login = async (event) => {
    event.preventDefault();

    dispatch(loginAction(state, push));
  };

  return (
    <div className={styles.login}>
      <div className={styles.presentation}>
        <h1 className={styles.title}>Log In</h1>

        <small className={styles.description}>
          Start a new chat with friends!
        </small>
      </div>

      <Form state={state} onChange={onChange} onSubmit={login} />

      <div className={styles.linkContainer}>
        <span>
          Dont have an account?{' '}
          {
            <Link className={styles.link} to="/signup">
              Sign up
            </Link>
          }
        </span>
      </div>
    </div>
  );
};

export default Login;
