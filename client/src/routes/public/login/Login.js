import styles from './Login.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import FormInput from '../../../components/formInput/FormInput';

import { loginService } from '../../../services/authServices';

// Icons
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';

const Login = () => {
  const [data, setData] = useState({
    userEmail: '',
    userPassword: '',
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

    const response = await loginService(data);
    const { success, auth, msg } = response;

    if (success === false) {
      alert(msg);
    }

    if (success === true) {
      console.log(auth);
    }
  };

  return (
    <div className={styles.login}>
      <h1 className={styles.title}>Login</h1>
      <small className={styles.smallText}>
        Remember to get up & stretch once in a while - your friends at chat
      </small>

      <form className={styles.form} onSubmit={login}>
        <FormInput
          label='Email'
          Icon={AiOutlineMail}
          type='email'
          name='userEmail'
          handler={inputHandler}
          placeholder='Email...'
          isAvatar={false}
        />

        <FormInput
          label='Password'
          Icon={RiLockPasswordLine}
          type='password'
          name='userPassword'
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
