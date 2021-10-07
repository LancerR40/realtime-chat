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
            src={userData.picture.medium}
            alt="Fake name"
          />
          <span className={styles.status}></span>
        </div>

        <div className={styles.userNameContainer}>
          <span className={styles.userName}>
            {userData.name.first} {userData.name.last}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
