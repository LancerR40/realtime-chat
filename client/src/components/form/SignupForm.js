import Input from './input/Input';
import InputAvatar from './input/InputAvatar';
import Button from './button/Button';

import { AiOutlineUser, AiOutlineMail, AiOutlineUpload } from 'react-icons/ai';
import { RiLockPasswordLine } from 'react-icons/ri';

import { useSelector } from 'react-redux';

const SignupForm = ({ state, onChange, onSubmit }) => {
  const isLoading = useSelector((state) => state.loader.signupLoader);

  return (
    <form onSubmit={onSubmit}>
      <Input
        label="Fullname"
        type="text"
        name="fullname"
        value={state.fullname}
        icon={<AiOutlineUser />}
        placeholder="Fullname..."
        onChange={onChange}
      />

      <Input
        label="Email"
        type="email"
        name="email"
        value={state.email}
        icon={<AiOutlineMail />}
        placeholder="Email..."
        onChange={onChange}
      />

      <Input
        label="Password"
        type="password"
        name="password"
        value={state.password}
        icon={<RiLockPasswordLine />}
        placeholder="Password..."
        onChange={onChange}
      />

      <InputAvatar
        label="Avatar"
        type="file"
        name="avatar"
        icon={<AiOutlineUpload />}
        onChange={onChange}
      />

      <Button title="Sign Up" withAnimation={isLoading} />
    </form>
  );
};

export default SignupForm;
