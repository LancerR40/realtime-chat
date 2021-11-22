import styles from './Message.module.css';
import { useEffect } from 'react';

const Message = ({ type, text, time, isFocus }) => {
  useEffect(() => {
    if (isFocus.focus) {
      isFocus.ref = isFocus.ref.current.focus();
    }
  }, []);

  return (
    <div
      className={`${styles.messageContainer} ${
        type === 'outgoing' ? styles.flexEnd : ''
      }`}
      tabIndex={isFocus.focus ? '-1' : null}
      ref={isFocus.focus ? isFocus.ref : null}
    >
      <div
        className={`${styles.message} ${
          type === 'incoming' ? styles.incomingMessage : styles.outgoingMessage
        }`}
      >
        <span className={styles.messageText}>{text}</span>

        <span className={styles.datetime}>{time}</span>
      </div>
    </div>
  );
};

export default Message;
