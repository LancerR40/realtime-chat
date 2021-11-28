import FormInput from '../formInput/FormInput';

import { AiOutlineUser, AiOutlineMail, AiOutlineUpload } from 'react-icons/ai';
import { BiCheckSquare } from 'react-icons/bi';
import { RiLockPasswordLine } from 'react-icons/ri';

const Form = ({
  type,
  onAction,
  state,
  inputHandler,
  styles,
  buttonText,
  previewAvatar,
  previewAvatarHandler,
}) => {
  return (
    <form className={styles.form} onSubmit={onAction}>
      {type === 'Login' ? (
        <>
          <FormInput
            label='Email'
            Icon={AiOutlineMail}
            type='email'
            name='email'
            value={state.email}
            handler={inputHandler}
            placeholder='Email...'
            isAvatar={false}
          />

          <FormInput
            label='Password'
            Icon={RiLockPasswordLine}
            type='password'
            name='password'
            value={state.password}
            handler={inputHandler}
            placeholder='Password...'
            isAvatar={false}
          />
        </>
      ) : (
        <>
          <FormInput
            label='Full name'
            Icon={AiOutlineUser}
            type='text'
            name='fullname'
            value={state.fullname}
            handler={inputHandler}
            placeholder='Full name...'
            isAvatar={false}
          />

          <FormInput
            label='Email'
            Icon={AiOutlineMail}
            type='email'
            name='email'
            value={state.email}
            handler={inputHandler}
            placeholder='Email...'
            isAvatar={false}
          />

          <FormInput
            label='Password'
            Icon={RiLockPasswordLine}
            type='password'
            name='password'
            value={state.password}
            handler={inputHandler}
            placeholder='Password...'
            isAvatar={false}
          />

          <FormInput
            label='Avatar'
            Icon={AiOutlineUpload}
            type='file'
            name='avatar'
            handler={previewAvatarHandler}
            placeholder='Password...'
            isAvatar={true}
            SecondIcon={BiCheckSquare}
            previewAvatar={previewAvatar}
          />
        </>
      )}

      <button className={styles.button} type='submit'>
        {buttonText}
      </button>
    </form>
  );
};

export default Form;
