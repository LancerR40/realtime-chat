import styles from './ChatList.module.css';
import { useSelector } from 'react-redux';
import UserCard from './UserCard';

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
        <UserCard key={chat.id} chat={chat} setCurrentChat={setChat} />
      ))}
    </div>
  );
};

export default ChatList;
