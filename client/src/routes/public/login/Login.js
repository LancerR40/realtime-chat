import styles from './Login.module.css';

import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useHeight from '../../../hooks/useHeight';

import FormInput from '../../../components/formInput/FormInput';

import { useDispatch } from 'react-redux';
import { loginAction } from '../../../store/actions/auth';

// Icons
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';

const Login = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const screenHeight = useHeight();

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const inputHandler = (event) => {
    const { name, value } = event.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const login = async (event) => {
    event.preventDefault();

    dispatch(loginAction(data, push));
  };

  return (
    <div className={styles.login} style={{ height: screenHeight }}>
      <h1 className={styles.title}>Login</h1>
      <small className={styles.smallText}>
        Remember to get up & stretch once in a while - your friends at chat
      </small>

      <form className={styles.form} onSubmit={login}>
        <FormInput
          label='Email'
          Icon={AiOutlineMail}
          type='email'
          name='email'
          value={data.email}
          handler={inputHandler}
          placeholder='Email...'
          isAvatar={false}
        />

        <FormInput
          label='Password'
          Icon={RiLockPasswordLine}
          type='password'
          name='password'
          value={data.password}
          handler={inputHandler}
          placeholder='Password...'
          isAvatar={false}
        />

        <button className={styles.button} type='submit'>
          Log In
        </button>

        <span className={styles.linkText}>
          {'Dont have an account? '}
          <Link className={styles.link} to='/signup'>
            Sign Up
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
