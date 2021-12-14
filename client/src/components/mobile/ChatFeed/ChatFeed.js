import styles from './ChatFeed.module.css';
import Header from './Header';
import Message from './Message';
import MessageInput from '../MessageInput/MessageInput';

import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMsgToUserAction } from '../../../store/action/chat';

import { formatTimestamp } from '../../../utils/date';

import sendMessageSound from '../../../../public/assets/sounds/src_message_sent.mp3';

const ChatFeed = ({ chat, socket }) => {
  const dispatch = useDispatch();

  const currentChat = useSelector((state) => state.chat.currentChat);
  const messages = useSelector((state) => state.chat.currentChat.chat);

  const chatContainer = useRef('');
  const messageText = useRef('');

  const sendMsgToUser = () => {
    const audio = new Audio(sendMessageSound);
    audio.play();

    const { value } = messageText.current;

    if (value === '') return;

    const { id } = currentChat;

    const message = {
      incomingUserId: id,
      messageContent: value,
    };

    dispatch(sendMsgToUserAction(message, socket));

    messageText.current.value = '';
  };

  useEffect(() => {
    const { current: DOMElement } = chatContainer;

    DOMElement.scrollTop = DOMElement.scrollHeight;
  }, [messages]);

  return (
    <>
      <Header userData={chat} />

      <div className={styles.chat} ref={chatContainer}>
        {messages.map((msg, index) =>
          msg.outgoingUserId !== currentChat.id ? (
            <Message
              key={index}
              type="outgoing"
              text={msg.content}
              time={formatTimestamp(msg.datetime)}
            />
          ) : (
            <Message
              key={index}
              type="incoming"
              text={msg.content}
              time={formatTimestamp(msg.datetime)}
            />
          )
        )}
      </div>

      <MessageInput sendMsg={sendMsgToUser} text={messageText} />
    </>
  );
};

export default ChatFeed;
