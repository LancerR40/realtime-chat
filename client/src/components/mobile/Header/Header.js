import styles from './Header.module.css';

import SearchInput from '../SearchInput/SearchInput';
// import Contacts from '../Contacts/Contacts';

// import { useSelector } from 'react-redux';

const Header = ({ searchUserFullname, setUsers }) => {
  // const avatar = useSelector((state) => state.chat.user);

  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <h1 className={styles.title}>Messages</h1>

        {/* <img className={styles.avatar} src={avatar} alt='Ronald Abu Saleh' /> */}
      </div>

      <div className={styles.bottom}>
        <SearchInput
          searchUserFullname={searchUserFullname}
          setUsersHandler={setUsers}
        />

        {/* <Contacts /> */}
      </div>
    </header>
  );
};

export default Header;
