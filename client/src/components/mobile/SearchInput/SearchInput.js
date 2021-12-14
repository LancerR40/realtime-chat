import styles from './SearchInput.module.css';
import { BiSearch } from 'react-icons/bi';
import { RiDeleteBack2Line } from 'react-icons/ri';

const getStyleProp = (userFullname) => {
  const { length } = userFullname;

  return {
    searchIcon: !length ? '1' : '0',
    deleteIcon: length ? '1' : '0',
  };
};

const SearchInput = ({ userToSearch, searchUsersHandler }) => {
  const { current: userFullname } = userToSearch;

  return (
    <div className={styles.searchInput}>
      <input
        className={styles.input}
        type='text'
        placeholder='Search here...'
        onChange={searchUsersHandler}
      />

      <span className={styles.line}></span>

      {/* Icon here */}
      <div className={styles.iconContainer}>
        <BiSearch
          className={styles.icon}
          style={{ opacity: getStyleProp(userFullname).searchIcon }}
        />
        <RiDeleteBack2Line
          className={styles.icon}
          style={{ opacity: getStyleProp(userFullname).deleteIcon }}
        />
      </div>
    </div>
  );
};

export default SearchInput;
