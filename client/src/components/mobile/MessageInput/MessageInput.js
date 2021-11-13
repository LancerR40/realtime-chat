import styles from './MessageInput.module.css';
import { FaTelegramPlane } from 'react-icons/fa';

const MessageInput = ({ msg, sendMsg }) => {
  return (
    <div className={styles.messageInput}>
      <input
        className={styles.input}
        type='text'
        placeholder='Enter message...'
        ref={msg}
      />

      <div className={styles.iconContainer} onClick={sendMsg}>
        <FaTelegramPlane className={styles.icon} />
      </div>
    </div>
  );
};

export default MessageInput;
