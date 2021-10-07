import styles from './Message.module.css';

const Message = ({ type, text }) => (
  <div
    className={`${styles.messageContainer} ${
      type === 'outgoing' ? styles.flexEnd : ''
    }`}
  >
    <div
      className={`${styles.message} ${
        type === 'incoming' ? styles.incomingMessage : styles.outgoingMessage
      }`}
    >
      <span className={styles.messageText}>{text}</span>

      <span className={styles.datetime}>10:30PM</span>
    </div>
  </div>
);

export default Message;
