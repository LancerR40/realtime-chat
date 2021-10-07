import styles from './Header.module.css';

// Components
import SearchInput from '../SearchInput/SearchInput';
import Contacts from '../Contacts/Contacts';

import img from '../../../assets/img/img-5.jpg';

const Header = ({ setUsers }) => {
  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <h1 className={styles.title}>Chat Room</h1>

        <img className={styles.avatar} src={img} alt="Ronald Abu Saleh" />
      </div>

      <div className={styles.bottom}>
        <SearchInput setUsersHandler={setUsers} />

        <Contacts />
      </div>
    </header>
  );
};

export default Header;
