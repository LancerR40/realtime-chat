import styles from './Chat.module.css';

import ChatMenu from '../../components/mobile/ChatMenu/ChatMenu';
import ChatFeed from '../../components/mobile/ChatFeed/ChatFeed';

import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useCalculateHeight from '../../hooks/useCalculateHeight';

import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../store/action/auth';
import {
  getUserDataAction,
  userMsgFromServerAction,
} from '../../store/action/chat';

import { io } from 'socket.io-client';
import { SOCKET_SERVER_ENDPOINT } from '../../constant/chat';

import recivedMessage from '../../../public/assets/sounds/src_message_received.mp3';

let socket = null;

const MobileUI = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();

  const currentChat = useSelector((state) => state.chat.currentChat);
  const screenHeight = useCalculateHeight();

  const disconnect = () => {
    dispatch(logoutAction(push, socket));

    socket = null;
  };

  useEffect(() => {
    dispatch(getUserDataAction());

    const token = localStorage.getItem('token');

    socket = io(SOCKET_SERVER_ENDPOINT, {
      query: {
        token,
      },
      transports: ['websocket'],
      upgrade: false,
    });
  }, []);

  useEffect(() => {
    socket.on('chat:msg', (data) => {
      const audio = new Audio(recivedMessage);
      audio.play();

      dispatch(userMsgFromServerAction(data));
    });

    return () => socket !== null && socket.off();
  }, []);

  const currentSection = Object.keys(currentChat).length;

  return (
    <div className={styles.mobile} style={{ height: screenHeight }}>
      {currentSection < 1 && <ChatMenu disconnect={disconnect} />}

      {currentSection > 0 && <ChatFeed chat={currentChat} socket={socket} />}
    </div>
  );
};

const Chat = () => <MobileUI />;

export default Chat;
