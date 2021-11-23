import styles from './ChatList.module.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';

const ChatCard = ({ chat, setChat }) => {
  const [timeAgo, setTimeAgo] = useState(
    format(chat.chat[chat.chat.length - 1].datetime)
  );

  useEffect(() => {
    const interval = setInterval(
      () => setTimeAgo(format(chat.chat[chat.chat.length - 1].datetime)),
      1000
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.chat} onClick={() => setChat(chat)}>
      <div className={styles.imgContainer}>
        <img className={styles.img} src={chat.avatar} alt={chat.fullname} />
        <span className={styles.status}></span>
      </div>

      <div className={styles.chatData}>
        <span className={styles.name}>{chat.fullname}</span>
        <span className={styles.lastMsg}>
          {chat.chat[chat.chat.length - 1].content.length > 15
            ? chat.chat[chat.chat.length - 1].content.slice(0, 15) + '...'
            : chat.chat[chat.chat.length - 1].content}
        </span>
        <span className={styles.timeAgo}>
          {timeAgo.split(' ')[1] === 'seconds' ? 'just now' : timeAgo}
        </span>
      </div>
    </div>
  );
};

const ChatList = ({ setChat }) => {
  const chats = useSelector((state) => {
    const { contacts } = state.chat;

    return contacts
      .filter((contact) => contact?.chat.length > 0)
      .sort(
        (a, b) =>
          b.chat[b.chat.length - 1].datetime -
          a.chat[a.chat.length - 1].datetime
      );
  });

  return (
    <div className={styles.chatList}>
      {chats.map((chat) => (
        <ChatCard key={chat.id} chat={chat} setChat={setChat} />
      ))}
    </div>
  );
};

export default ChatList;
