import styles from './Contacts.module.css';
import { useState, useEffect } from 'react';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getPeople = async () => {
      const request = await fetch('https://randomuser.me/api/?results=8');
      const data = await request.json();
      const people = data.results;

      setContacts(people);
    };

    getPeople();
  }, []);

  return (
    <div className={styles.contacts}>
      {contacts.map((contact) => (
        <div className={styles.contact} key={contact.cell}>
          <span className={styles.status}></span>
          <img
            className={styles.contactImg}
            src={contact.picture.medium}
            alt="Loke"
          />
        </div>
      ))}
    </div>
  );
};

export default Contacts;
