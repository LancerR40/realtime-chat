import styles from './UserCard.module.css';

import PropTypes from 'prop-types';
import useTimeAgo from '../../../hooks/useTimeAgo';

const getLastMessageContent = (user) => {
  const lastIndex = user.chat.length - 1;
  const messageContent = user.chat[lastIndex].content;

  if (messageContent.length > 15) {
    return messageContent.slice(0, 20) + '...';
  }

  return messageContent;
};

const UserCard = ({ chat, isConnected, setCurrentChat }) => {
  // Last msg datetime
  const datetime = chat.chat[chat.chat.length - 1].datetime;
  // Last msg time ago
  const timeAgo = useTimeAgo(datetime);

  const isConnectedClasses = isConnected ? 'rgb(50, 204, 50)' : 'red';

  return (
    <>
      <div className={styles.chat} onClick={() => setCurrentChat(chat)}>
        <div className={styles.imgContainer}>
          <img className={styles.img} src={chat.avatar} alt={chat.fullname} />
          <span
            className={styles.status}
            style={{ background: isConnectedClasses }}
          ></span>
        </div>

        <div className={styles.chatData}>
          <span className={styles.name}>{chat.fullname}</span>
          <span className={styles.lastMsg}>{getLastMessageContent(chat)}</span>
          <span className={styles.timeAgo}>{timeAgo}</span>
        </div>
      </div>

      <div className={styles.containerLine}>
        <div className={styles.line}></div>
      </div>
    </>
  );
};

UserCard.propTypes = {
  chat: PropTypes.object.isRequired,
  isConnected: PropTypes.bool.isRequired,
  setCurrentChat: PropTypes.func.isRequired,
};

export default UserCard;
