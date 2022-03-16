import styles from './Footer.module.css'
import PropTypes from 'prop-types'

import { BsFillChatSquareFill, BsChatSquare } from 'react-icons/bs'
import { AiFillContacts, AiOutlineContacts } from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi'

const CHATS = 'Chats'
const CONTACTS = 'Contacts'
const LOGOUT = 'Logout'

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
  ]

  return (
    <footer className={styles.footer}>
      {elements.map((section) => {
        const classes = `${styles.iconContainer} ${
          currentSection === section.sectionName && styles.active
        }`

        const icon =
          currentSection === section.sectionName
            ? section.activeIcon
            : section.inactiveIcon

        return (
          <div
            key={section.id}
            className={classes}
            onClick={() => section.onClick(section.sectionName)}
          >
            {icon}

            <span className={styles.text}>{section.sectionName}</span>
          </div>
        )
      })}

      <div className={styles.iconContainer} onClick={disconnect}>
        <FiLogOut style={{ fontSize: '20px' }} className={styles.icon} />
        <span className={styles.text}>{LOGOUT}</span>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  currentSection: PropTypes.string.isRequired,
  changeSection: PropTypes.func.isRequired,
  disconnect: PropTypes.func.isRequired,
}

export default Footer
