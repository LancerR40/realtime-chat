import styles from './Chat.module.css';

// Components
import MobileHeader from '../../components/mobile/Header/Header';
import MobileChatList from '../../components/mobile/ChatList/ChatList';
import MobileContactList from '../../components/mobile/ContactList/ContactList';
import MobileUsersFoundList from '../../components/mobile/UsersFoundList/UsersFoundList';
import MobileFooter from '../../components/mobile/Footer/Footer';
import MobileChatFeed from '../../components/mobile/ChatFeed/ChatFeed';

// Modules
import { useState, useEffect } from 'react';

const MobileUI = () => {
  // States
  const [people, setPeople] = useState([]);

  const [currentChat, setCurrentChat] = useState({});
  const [currentSection, setCurrentSection] = useState('Chats');

  const [usersFound, setUsersFound] = useState([]);

  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  // Functions
  const sectionHandler = (sectionName) => setCurrentSection(sectionName);

  const usersFoundHandler = async (event) => {
    const { value } = event.target;

    if (value === '') {
      setUsersFound([]);

      return;
    }

    const name = value[0].toUpperCase() + value.slice(1);

    const filteredUsers = people.filter((user) =>
      user.name.first.startsWith(name)
    );

    if (filteredUsers.length > 0) {
      setUsersFound(filteredUsers);

      return;
    }

    setUsersFound([{ msg: 'Not found' }]);
  };

  const closeCurrentChat = () => setCurrentChat({});

  useEffect(() => {
    const getPeople = async () => {
      const request = await fetch('https://randomuser.me/api/?results=1000');
      const data = await request.json();
      const people = data.results;

      setPeople(people);
    };

    getPeople();
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
              <MobileUsersFoundList list={usersFound} display={true} />
            )
          )}

          <MobileFooter
            section={currentSection}
            changeSection={sectionHandler}
          />
        </>
      )}

      {Object.keys(currentChat).length > 0 && (
        <MobileChatFeed chat={currentChat} closeChat={closeCurrentChat} />
      )}
    </div>
  );
};

const Chat = () => <MobileUI />;

export default Chat;
