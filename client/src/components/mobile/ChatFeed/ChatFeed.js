import styles from './ChatFeed.module.css';
import Header from './Header';
import Message from './Message';
import MessageInput from '../MessageInput/MessageInput';

import { useRef } from 'react';
import { useSelector } from 'react-redux';

import { formatTimestamp } from '../../../utils/date';

const ChatFeed = ({ chat, msg, sendMsg, closeChat }) => {
  const currentChat = useSelector((state) => state.chat.currentChat);
  const messages = useSelector((state) => state.chat.currentChat.chat);

  const messageFocus = useRef(null);

  return (
    <>
      <Header userData={chat} close={closeChat} />

      <div className={styles.chat}>
        {messages?.length > 0 &&
          messages.map((msg, index) =>
            msg.outgoingUserId !== currentChat.id ? (
              <Message
                key={index}
                type='outgoing'
                text={msg.content}
                time={formatTimestamp(msg.datetime)}
                isFocus={
                  index === messages.length - 1
                    ? { focus: true, ref: messageFocus }
                    : false
                }
              />
            ) : (
              <Message
                key={index}
                type='incoming'
                text={msg.content}
                time={formatTimestamp(msg.datetime)}
                isFocus={
                  index === messages.length - 1
                    ? { focus: true, ref: messageFocus }
                    : false
                }
              />
            )
          )}
      </div>

      <MessageInput msg={msg} sendMsg={sendMsg} />
    </>
  );
};

export default ChatFeed;
