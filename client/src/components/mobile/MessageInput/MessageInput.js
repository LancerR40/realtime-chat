import styles from './MessageInput.module.css';
import { memo } from 'react';
import { FaTelegramPlane } from 'react-icons/fa';

const MessageInput = ({ text, sendMsg }) => {
  return (
    <div className={styles.messageInput}>
      <input
        className={styles.input}
        type='text'
        placeholder='Enter message...'
        ref={text}
      />

      <div className={styles.iconContainer} onClick={sendMsg}>
        <FaTelegramPlane className={styles.icon} />
      </div>
    </div>
  );
};

export default memo(MessageInput);
