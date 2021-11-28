import styles from './FormLayout.module.css';
import { Link } from 'react-router-dom';

import Form from '../form/Form';

import useHeight from '../../hooks/useHeight';

const FormLayout = ({
  title,
  smallText,
  linkText,
  linkTitle,
  formType,
  onAction,
  state,
  handler,
  previewAvatar,
  previewAvatarHandler,
}) => {
  const screenHeight = useHeight();

  return (
    <div className={styles.layout} style={{ height: screenHeight }}>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{title}</h1>

        <small className={styles.smallText}>{smallText}</small>
      </div>

      {formType === 'Login' ? (
        <Form
          type='Login'
          onAction={onAction}
          state={state}
          inputHandler={handler}
          styles={styles}
          buttonText='Log In'
        />
      ) : (
        <Form
          type='Signup'
          onAction={onAction}
          state={state}
          inputHandler={handler}
          styles={styles}
          buttonText='Sign Up'
          {...{ previewAvatar, previewAvatarHandler }}
        />
      )}

      <span className={styles.linkText}>
        {linkText}
        <Link
          className={styles.link}
          to={`/${formType === 'Login' ? 'signup' : 'login'}`}
        >
          {linkTitle}
        </Link>
      </span>
    </div>
  );
};

export default FormLayout;
