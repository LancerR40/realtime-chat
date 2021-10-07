import styles from './ChatFeed.module.css';
import Header from './Header';
import Message from './Message';
import MessageInput from '../MessageInput/MessageInput';

const textNum1 = 'We will build a small game during this tutorial';
const textNum2 = 'Hello World and Ronald';

const ChatFeed = ({ chat, closeChat }) => {
  return (
    <>
      <Header userData={chat} close={closeChat} />

      <div className={styles.chat}>
        <Message type="incoming" text={textNum1} />

        <Message type="outgoing" text={textNum2} />

        <Message type="incoming" text={textNum2} />
      </div>

      <MessageInput />
    </>
  );
};

export default ChatFeed;
