import styles from './ChatList.module.css';

import PropTypes from 'prop-types';
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
        <UserCard
          key={chat.id}
          chat={chat}
          isConnected={chat.isConnected}
          setCurrentChat={setChat}
        />
      ))}
    </div>
  );
};

ChatList.propTypes = {
  setChat: PropTypes.func.isRequired,
};

export default ChatList;
