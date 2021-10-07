import styles from './Footer.module.css';
import { BsFillChatSquareFill, BsChatSquare } from 'react-icons/bs';
import { AiFillContacts, AiOutlineContacts } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';

const Footer = ({ section, changeSection }) => {
  return (
    <footer className={styles.footer}>
      <div
        className={`${styles.iconContainer} ${
          section === 'Chats' && styles.active
        }`}
        onClick={() => changeSection('Chats')}
      >
        {section === 'Chats' ? (
          <BsFillChatSquareFill className={styles.icon} />
        ) : (
          <BsChatSquare className={styles.icon} />
        )}
        <span className={styles.text}>Chats</span>
      </div>

      <div
        className={`${styles.iconContainer} ${
          section === 'Contacts' && styles.active
        }`}
        onClick={() => changeSection('Contacts')}
      >
        {section === 'Contacts' ? (
          <AiFillContacts className={styles.icon} />
        ) : (
          <AiOutlineContacts className={styles.icon} />
        )}
        <span className={styles.text}>Contacts</span>
      </div>

      <div className={styles.iconContainer}>
        <FiLogOut className={styles.icon} />
        <span className={styles.text}>Logout</span>
      </div>
    </footer>
  );
};

export default Footer;
