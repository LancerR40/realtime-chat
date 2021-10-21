import styles from './MessageInput.module.css';
import { FaTelegramPlane } from 'react-icons/fa';

const MessageInput = () => {
  return (
    <div className={styles.messageInput}>
      <input
        className={styles.input}
        type="text"
        placeholder="Enter message..."
      />

      <div className={styles.iconContainer}>
        <FaTelegramPlane className={styles.icon} />
      </div>
    </div>
  );
};

export default MessageInput;