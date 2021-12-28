import styles from './MessageInput.module.css';
import PropTypes from 'prop-types';

import { FaTelegramPlane } from 'react-icons/fa';

const MessageInput = ({ text, sendMessage, onChange }) => {
  return (
    <div className={styles.messageInput}>
      <input
        className={styles.input}
        type="text"
        placeholder="Enter message..."
        value={text}
        onChange={onChange}
      />

      <div className={styles.iconContainer} onClick={sendMessage}>
        <FaTelegramPlane className={styles.icon} />
      </div>
    </div>
  );
};

MessageInput.propTypes = {
  text: PropTypes.string.isRequired,
  sendMessage: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MessageInput;
