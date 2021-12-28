import styles from './Message.module.css';
import PropTypes from 'prop-types';

const getMessageClasses = (messageType) => {
  let flexEndClass = null;
  let messageClass = null;

  if (messageType === 'outgoing') {
    flexEndClass = styles.flexEnd;
    messageClass = styles.outgoingMessage;
  }

  if (messageType === 'incoming') {
    messageClass = styles.incomingMessage;
  }

  return {
    container: `${styles.messageContainer} ${flexEndClass}`,
    message: `${styles.message} ${messageClass}`,
  };
};

const Message = ({ type, text, time }) => {
  const containerClasses = getMessageClasses(type).container;
  const messageClasses = getMessageClasses(type).message;

  return (
    <div className={containerClasses}>
      <div className={messageClasses}>
        <span className={styles.messageText}>{text}</span>

        {/* <span className={styles.datetime}>{time}</span> */}
      </div>
    </div>
  );
};

Message.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  time: PropTypes.string,
};

export default Message;
