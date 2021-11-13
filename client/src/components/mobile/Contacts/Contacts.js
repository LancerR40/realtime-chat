import styles from './Contacts.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Contacts = () => {
  const contacts = useSelector((state) => state.chat.contacts);

  return (
    <div className={styles.contacts}>
      {contacts.map(({ id, fullname, avatar }) => (
        <div className={styles.contact} key={id}>
          <span className={styles.status}></span>
          <img className={styles.contactImg} src={avatar} alt={fullname} />
        </div>
      ))}
    </div>
  );
};

export default Contacts;
