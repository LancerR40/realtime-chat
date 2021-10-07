import styles from './SearchInput.module.css';
import { BiSearch } from 'react-icons/bi';

const SearchInput = ({ setUsersHandler }) => {
  return (
    <div className={styles.searchInput}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search here..."
        onChange={setUsersHandler}
      />

      <span className={styles.line}></span>

      {/* Icon here */}
      <div className={styles.iconContainer}>
        <BiSearch className={styles.icon} />
      </div>
    </div>
  );
};

export default SearchInput;
