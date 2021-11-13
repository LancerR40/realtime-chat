import styles from './Chat.module.css';

// Components
import MobileHeader from '../../components/mobile/Header/Header';
import MobileChatList from '../../components/mobile/ChatList/ChatList';
import MobileContactList from '../../components/mobile/ContactList/ContactList';
import MobileUsersFoundList from '../../components/mobile/UsersFoundList/UsersFoundList';
import MobileFooter from '../../components/mobile/Footer/Footer';
import MobileChatFeed from '../../components/mobile/ChatFeed/ChatFeed';

// Modules
import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../store/actions/auth';
import {
  chatDataAction,
  findUsersAction,
  setCurrentChatAction,
  closeCurrentChatAction,
  sendMsgAction,
} from '../../store/actions/chat';

const MobileUI = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();

  // Ref
  const msgRef = useRef('');

  // States
  const [currentSection, setCurrentSection] = useState('Chats');

  const usersFound = useSelector((state) => state.chat.usersFound);
  const currentChat = useSelector((state) => state.chat.currentChat);

  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  // Functions
  const sendMsg = () => {
    const { value } = msgRef.current;

    if (value === '') {
      return;
    }

    const { id, fullname } = currentChat;

    const data = {
      incomingUserId: id,
      incomingUserFullname: fullname,
      msg: value,
    };

    dispatch(sendMsgAction(data));
  };

  const sectionHandler = (sectionName) => setCurrentSection(sectionName);

  const usersFoundHandler = (event) => {
    const { value } = event.target;

    dispatch(findUsersAction(value));
  };

  const setCurrentChat = (user) => {
    if (!user.chat) {
      return dispatch(setCurrentChatAction(user));
    }

    dispatch(setCurrentChatAction(user));
  };

  const closeCurrentChat = () => {
    if (usersFound.length > 0) {
      dispatch(findUsersAction());
    }

    dispatch(closeCurrentChatAction());
  };

  const logout = () => dispatch(logoutAction(push));

  useEffect(() => {
    dispatch(chatDataAction());
  }, []);

  useEffect(() => {
    addEventListener('resize', () => setScreenHeight(window.innerHeight), true);

    return removeEventListener(
      'resize',
      () => setScreenHeight(window.innerHeight),
      true
    );
  }, [screenHeight]);

  return (
    <div className={styles.mobile} style={{ height: screenHeight }}>
      {Object.keys(currentChat).length < 1 && (
        <>
          <MobileHeader setUsers={usersFoundHandler} />

          {usersFound.length < 1 && (
            <>
              {currentSection === 'Chats' && (
                <MobileChatList setChat={setCurrentChat} />
              )}

              {currentSection === 'Contacts' && (
                <MobileContactList setChat={setCurrentChat} />
              )}
            </>
          )}

          {usersFound[0]?.msg ? (
            <MobileUsersFoundList list={usersFound} display={false} />
          ) : (
            usersFound.length > 0 && (
              <MobileUsersFoundList
                list={usersFound}
                display={true}
                setChat={setCurrentChat}
              />
            )
          )}

          <MobileFooter
            section={currentSection}
            changeSection={sectionHandler}
            logout={logout}
          />
        </>
      )}

      {Object.keys(currentChat).length > 0 && (
        <MobileChatFeed
          chat={currentChat}
          msg={msgRef}
          sendMsg={sendMsg}
          closeChat={closeCurrentChat}
        />
      )}
    </div>
  );
};

const Chat = () => <MobileUI />;

export default Chat;
