import styles from './ChatList.module.css';
import { useState, useEffect } from 'react';

const ChatList = ({ setChat }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getPeople = async () => {
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

      setChats(people);
    };

    getPeople();
  }, []);

  return (
    <div className={styles.chatList}>
      {chats.map((chat) => (
        <div
          className={styles.chat}
          key={chat.cell}
          onClick={() => setChat(chat)}
        >
          <div className={styles.imgContainer}>
            <img className={styles.img} src={chat.picture.medium} alt="" />
            <span className={styles.status}></span>
          </div>

          <div className={styles.chatData}>
            <span className={styles.name}>
              {chat.name.first} {chat.name.last}
            </span>
            <span className={styles.lastMsg}>Hello developer! ....</span>
            <span className={styles.timeAgo}>2 min ago</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
