import styles from './Header.module.css';
import { IoArrowBack } from 'react-icons/io5';

import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentChatAction,
  findUsersAction,
} from '../../../store/action/chat';

const Header = ({ userData }) => {
  const dispatch = useDispatch();
  const usersFound = useSelector((state) => state.chat.usersFound);

  const closeChat = () => {
    if (usersFound.length) {
      dispatch(findUsersAction());
    }

    dispatch(setCurrentChatAction());
  };

  return (
    <div className={styles.header}>
      <div className={styles.backContainer} onClick={closeChat}>
        <IoArrowBack className={styles.icon} />
      </div>

      <div className={styles.userNameContainer}>
        <span className={styles.userName}>{userData.fullname}</span>
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
      </div>
    </div>
  );
};

export default Header;
