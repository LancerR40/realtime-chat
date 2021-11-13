import styles from './ChatList.module.css';
import { useSelector } from 'react-redux';

const ChatList = ({ setChat }) => {
  const chats = useSelector((state) => {
    const { contacts } = state.chat;

    return contacts.filter((contact) => contact?.chat.length > 0);
  });

  return (
    <div className={styles.chatList}>
      {chats.map((chat) => (
        <div
          className={styles.chat}
          key={chat.id}
          onClick={() => setChat(chat)}
        >
          <div className={styles.imgContainer}>
            <img className={styles.img} src={chat.avatar} alt='' />
            <span className={styles.status}></span>
          </div>

          <div className={styles.chatData}>
            <span className={styles.name}>{chat.fullname}</span>
            <span className={styles.lastMsg}>
              {chat.chat[chat.chat.length - 1].content}
            </span>
            <span className={styles.timeAgo}>2 min ago</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
