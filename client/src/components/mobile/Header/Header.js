import styles from './Header.module.css';

// Components
import SearchInput from '../SearchInput/SearchInput';
import Contacts from '../Contacts/Contacts';

import { useSelector } from 'react-redux';

const Header = ({ setUsers }) => {
  const avatar = useSelector((state) => state.chat.user);

  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <h1 className={styles.title}>Chat Room</h1>

        <img className={styles.avatar} src={avatar} alt='Ronald Abu Saleh' />
      </div>

      <div className={styles.bottom}>
        <SearchInput setUsersHandler={setUsers} />

        <Contacts />
      </div>
    </header>
  );
};

export default Header;
