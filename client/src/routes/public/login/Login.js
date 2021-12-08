import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import FormLayout from '../../../components/formLayout/FormLayout';

import { useDispatch } from 'react-redux';
import { loginAction } from '../../../store/actions/auth';

const Login = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();

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
    <FormLayout
      title='Login'
      smallText='Start a new chat with friends!'
      linkText='Dont have an account? '
      linkTitle='Sign Up'
      formType='Login'
      onAction={login}
      state={data}
      handler={inputHandler}
    />
  );
};

export default Login;
