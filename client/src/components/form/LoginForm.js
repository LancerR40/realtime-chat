import Input from './input/Input';
import Button from './button/Button';

import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';

const LoginForm = ({ state, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <Input
        label='Email'
        type='email'
        name='email'
        value={state.email}
        icon={<AiOutlineMail />}
        placeholder='Email...'
        onChange={onChange}
      />

      <Input
        label='Password'
        type='password'
        name='password'
        value={state.password}
        icon={<RiLockPasswordLine />}
        placeholder='Password...'
        onChange={onChange}
      />

      <Button title='Log In' withAnimation={false} />
    </form>
  );
};

export default LoginForm;
