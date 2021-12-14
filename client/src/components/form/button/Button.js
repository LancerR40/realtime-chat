import styles from './Button.module.css';

import Loader from '../loader/Loader';

const Button = ({ title, withAnimation }) => {
  return (
    <button className={styles.button} type='submit'>
      {withAnimation && <Loader />}

      {!withAnimation && title}
    </button>
  );
};

export default Button;
