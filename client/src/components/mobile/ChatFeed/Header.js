import styles from './Header.module.css';
import { IoIosArrowBack } from 'react-icons/io';

const Header = ({ userData, close }) => {
  return (
    <div className={styles.header}>
      <div className={styles.backContainer} onClick={close}>
        <IoIosArrowBack className={styles.icon} />
      </div>

      <div className={styles.userData}>
        <div className={styles.avatarContainer}>
          <img
            className={styles.avatar}
            src={userData.avatar}
            alt={userData.fullname}
          />
          <span className={styles.status}></span>
        </div>

        <div className={styles.userNameContainer}>
          <span className={styles.userName}>{userData.fullname}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
