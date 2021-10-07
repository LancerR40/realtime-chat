import styles from './ContactList.module.css';
import { useState, useEffect } from 'react';
import { BsTrash, BsFillTrashFill } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';

const ContactList = ({ setChat }) => {
  const [frecuently, setFrecuently] = useState([]);

  useEffect(() => {
    const getFrecuently = async () => {
      const request = await fetch('https://randomuser.me/api/?results=4');
      const data = await request.json();
      const people = data.results;

      // Add chats fakes
      for (let i = 0; i < people.length; i++) {
        people[i].chat = [
          {
            id: 1,
            msg: 'Hello',
          },
        ];
      }

      setFrecuently(people);
    };

    getFrecuently();
  }, []);

  return (
    <div className={styles.contactList}>
      {/* Frecuently contact list */}
      <div className={styles.titleContainer}>
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
      </div>

      {/* All contacts */}
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>My contacts</h2>
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
      </div>
    </div>
  );
};

export default ContactList;
