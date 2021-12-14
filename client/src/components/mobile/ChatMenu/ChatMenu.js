import Header from '../Header/Header';
import ChatList from '../ChatList/ChatList';
import ContactList from '../ContactList/ContactList';
import UsersFoundList from '../UsersFoundList/UsersFoundList';
import Footer from '../Footer/Footer';

import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChatAction } from '../../../store/action/chat';

import { CHATS_SECTION, CONTACTS_SECTION } from '../../../constant/chat';
import { useState } from 'react';

const ChatMenu = ({ disconnect }) => {
  const usersFound = useSelector((state) => state.chat.usersFound);
  const dispatch = useDispatch();

  const [currentSection, setCurrentSection] = useState(CHATS_SECTION);

  const setCurrentChat = (chat) => {
    dispatch(setCurrentChatAction(chat));
  };

  const changeSectionHandler = (sectionName) => {
    setCurrentSection(sectionName);
  };

  return (
    <>
      <Header />

      {usersFound.length < 1 && (
        <>
          {currentSection === CHATS_SECTION && (
            <ChatList setChat={setCurrentChat} />
          )}

          {currentSection === CONTACTS_SECTION && (
            <ContactList setChat={setCurrentChat} />
          )}
        </>
      )}

      {usersFound.length > 0 && (
        <UsersFoundList setChat={setCurrentChat} list={usersFound} />
      )}

      <Footer
        currentSection={currentSection}
        changeSection={changeSectionHandler}
        disconnect={disconnect}
      />
    </>
  );
};

export default ChatMenu;
