import { useState } from 'react';
import useHeight from '../../../hooks/useHeight';

import base64ToFile from '../../../utils/base64ToFile';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { signupAction } from '../../../store/actions/auth';

// Components
import Modal from './Modal';
import Loading from '../../../components/loading/Loading';
import FormLayout from '../../../components/formLayout/FormLayout';

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

      <FormLayout
        title='Register'
        smallText='You and Your Friends always Connected'
        linkText='Already have an account? '
        linkTitle='Log In'
        formType='Signup'
        onAction={signup}
        state={data}
        handler={inputHandler}
        {...{ previewAvatar, previewAvatarHandler }}
      />
    </>
  );
};

export default Signup;
