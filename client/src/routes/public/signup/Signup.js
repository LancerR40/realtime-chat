import styles from './Signup.module.css';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import useHeight from '../../../hooks/useHeight';

import base64ToFile from '../../../utils/base64ToFile';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { signupAction } from '../../../store/actions/auth';

// Components
import Modal from './Modal';
import FormInput from '../../../components/formInput/FormInput';
import Loading from '../../../components/loading/Loading';

// Icons
import { AiOutlineUser, AiOutlineMail, AiOutlineUpload } from 'react-icons/ai';
import { BiCheckSquare } from 'react-icons/bi';
import { RiLockPasswordLine } from 'react-icons/ri';

const Signup = () => {
  const dispatch = useDispatch();
  const screenHeight = useHeight();

  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [modalStatus, setModalStatus] = useState(false);

  const isLoading = useSelector((state) => state.auth.isLoading);

  const [data, setData] = useState({
    fullname: '',
    email: '',
    password: '',
  });

  const signup = async (event) => {
    event.preventDefault();

    const { fullname, email, password } = data;
    const formData = new FormData();

    formData.append('fullname', fullname);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('avatar', await base64ToFile(previewAvatar));

    dispatch(signupAction(formData, setData, setPreviewAvatar));
  };

  const inputHandler = (event) => {
    const { name, value } = event.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const previewAvatarHandler = (event) => {
    if (event.target.files < 1) {
      return;
    }

    if (event.target.files[0]?.type.startsWith('image') !== true) {
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      setPreviewAvatar(reader.result);

      setModalStatus(!modalStatus);
    };
  };

  const avatarModalHandler = (canvas, crop) => {
    if (!crop || !canvas) {
      return;
    }

    setModalStatus(!modalStatus);

    setPreviewAvatar(canvas.toDataURL());
  };

  const changeAvatarModalHandler = (event) => {
    if (event.target.files < 1) {
      return;
    }

    if (event.target.files[0].type.startsWith('image') !== true) {
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => setPreviewAvatar(reader.result);
  };

  return (
    <>
      {modalStatus === true && (
        <Modal
          avatar={previewAvatar}
          avatarHandler={avatarModalHandler}
          changeAvatarHandler={changeAvatarModalHandler}
        />
      )}

      {isLoading === true && <Loading />}

      <div className={styles.signup} style={{ height: screenHeight }}>
        <h1 className={styles.title}>Register</h1>
        <small className={styles.smallText}>
          You and Your Friends always Connected
        </small>

        <form className={styles.form} onSubmit={signup}>
          <FormInput
            label='Full name'
            Icon={AiOutlineUser}
            type='text'
            name='fullname'
            value={data.fullname}
            handler={inputHandler}
            placeholder='Full name...'
            isAvatar={false}
          />

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

          <button className={styles.button} type='submit'>
            Sign Up
          </button>

          <span className={styles.linkText}>
            {'Already have an account? '}
            <Link className={styles.link} to='/login'>
              Login
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Signup;
