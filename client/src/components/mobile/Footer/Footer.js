import styles from './Footer.module.css';
import { BsFillChatSquareFill, BsChatSquare } from 'react-icons/bs';
import { AiFillContacts, AiOutlineContacts } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';

const CHATS = 'Chats';
const CONTACTS = 'Contacts';
const LOGOUT = 'Logout';

const Footer = ({ currentSection, changeSection, disconnect }) => {
  const elements = [
    {
      id: 1,
      activeIcon: (
        <BsFillChatSquareFill
          style={{ fontSize: '20px' }}
          className={styles.icon}
        />
      ),
      inactiveIcon: (
        <BsChatSquare style={{ fontSize: '20px' }} className={styles.icon} />
      ),
      sectionName: CHATS,
      onClick: changeSection,
    },
    {
      id: 2,
      activeIcon: (
        <AiFillContacts style={{ fontSize: '23px' }} className={styles.icon} />
      ),
      inactiveIcon: (
        <AiOutlineContacts
          style={{ fontSize: '23px' }}
          className={styles.icon}
        />
      ),
      sectionName: CONTACTS,
      onClick: changeSection,
    },
    {
      id: 3,
      inactiveIcon: (
        <FiLogOut style={{ fontSize: '20px' }} className={styles.icon} />
      ),
      sectionName: LOGOUT,
      onClick: disconnect,
    },
  ];

  return (
    <footer className={styles.footer}>
      {elements.map((section) => {
        const classes = `${styles.iconContainer} ${
          currentSection === section.sectionName && styles.active
        }`;

        const onClickAction =
          section.sectionName === LOGOUT
            ? section.onClick
            : () => section.onClick(section.sectionName);

        return (
          <div className={classes} onClick={onClickAction}>
            {currentSection === section.sectionName
              ? section.activeIcon
              : section.inactiveIcon}

            {currentSection === LOGOUT && section.inactiveIcon}
            <span className={styles.text}>{section.sectionName}</span>
          </div>
        );
      })}
    </footer>
  );
};

export default Footer;
