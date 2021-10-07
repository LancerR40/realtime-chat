import styles from './Signup.module.css';

import { useState, useReducer } from 'react';
import { Link } from 'react-router-dom';

// Components
import Modal from './Modal';
import FormInput from '../../../components/formInput/FormInput';

// Icons
import { AiOutlineUser, AiOutlineMail, AiOutlineUpload } from 'react-icons/ai';
import { BiCheckSquare } from 'react-icons/bi';
import { RiLockPasswordLine } from 'react-icons/ri';

const initialState = {
  fullname: '',
  email: '',
  password: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'fullname':
      return { ...state, fullname: action.payload };
    case 'email':
      return { ...state, email: action.payload };
    case 'password':
      return { ...state, password: action.payload };
  }
};

const Signup = () => {
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [modalStatus, setModalStatus] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);

  const signup = (event) => {
    event.preventDefault();

    console.log(state);
    console.log(previewAvatar);
  };

  const inputHandler = (event) => {
    const { name, value } = event.target;
    dispatch({ type: name, payload: value });
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

      <div className={styles.signup}>
        <h1 className={styles.title}>Register</h1>
        <small className={styles.smallText}>
          You and Your Friends always Connected
        </small>

        <form className={styles.form} onSubmit={signup}>
          <FormInput
            label="Full name"
            Icon={AiOutlineUser}
            type="text"
            name="fullname"
            handler={inputHandler}
            placeholder="Full name..."
            isAvatar={false}
          />

          <FormInput
            label="Email"
            Icon={AiOutlineMail}
            type="email"
            name="email"
            handler={inputHandler}
            placeholder="Email..."
            isAvatar={false}
          />

          <FormInput
            label="Password"
            Icon={RiLockPasswordLine}
            type="password"
            name="password"
            handler={inputHandler}
            placeholder="Password..."
            isAvatar={false}
          />

          <FormInput
            label="Avatar"
            Icon={AiOutlineUpload}
            type="file"
            name="avatar"
            handler={previewAvatarHandler}
            placeholder="Password..."
            isAvatar={true}
            SecondIcon={BiCheckSquare}
            previewAvatar={previewAvatar}
          />

          <button className={styles.button} type="submit">
            Sign Up
          </button>

          <span className={styles.linkText}>
            {'Already have an account? '}
            <Link className={styles.link} to="/login">
              Login
            </Link>
          </span>
        </form>
      </div>
    </>
  );
};

export default Signup;
