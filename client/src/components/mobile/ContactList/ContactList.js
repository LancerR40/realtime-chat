import styles from './ContactList.module.css'
import PropTypes from 'prop-types'
// import { useState, useEffect } from 'react';
// import { BsTrash, BsFillTrashFill } from 'react-icons/bs';
// import { FaTrash } from 'react-icons/fa';

import { useSelector } from 'react-redux'

const ContactList = ({ setChat }) => {
  const contacts = useSelector((state) => state.chat.contacts)

  return (
    <div className={styles.contactList}>
      {/* Frecuently contact list */}
      {/* <div className={styles.titleContainer}>
        <h2 className={styles.title}>Frequent contacts</h2>
      </div>

      <div className={styles.frecuentlyContactsContainer}>
        {frecuently.map((contact) => (
          <div
            className={styles.contact}
            key={contact.cell}
            onClick={() => setChat(contact)}
          >
            <img
              className={styles.img}
              src={contact.picture.medium}
              alt="Fake"
            />

            <span className={styles.name}>
              {contact.name.first} {contact.name.last}
            </span>

            <FaTrash className={styles.icon} />
          </div>
        ))}
      </div> */}

      {/* All contacts */}
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>My contacts</h2>
      </div>

      <div className={styles.frecuentlyContactsContainer}>
        {contacts.map((contact) => (
          <div
            className={styles.contact}
            key={contact.id}
            onClick={() => setChat(contact)}
          >
            <img
              className={styles.img}
              src={contact.avatar}
              alt={contact.fullname}
            />

            <span className={styles.name}>{contact.fullname}</span>

            {/* <FaTrash className={styles.icon} /> */}
          </div>
        ))}
      </div>
    </div>
  )
}

ContactList.propTypes = {
  setChat: PropTypes.func.isRequired,
}

export default ContactList
