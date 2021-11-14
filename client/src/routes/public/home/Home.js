import styles from './Home.module.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import GreatChat from '../../../../public/assets/GreatChat.jsx';
import Community from '../../../../public/assets/Community.jsx';
import Security from '../../../../public/assets/Security.jsx';

const CONTENT = [
  {
    id: 1,
    name: 'World chat',
    img: <GreatChat />,
    description: 'Get started with this great online chat community worldwide!',
  },
  {
    id: 2,
    name: 'Best network',
    img: <Community />,
    description:
      'Connect with people from all over the world in this fantastic network',
  },
  {
    id: 3,
    name: 'Real time chat',
    img: <Security />,
    description:
      'Do you send messages at all times, concerned about security? We protect your data',
  },
];

const Home = () => {
  const { push } = useHistory();

  const [currentImg, setCurrentImg] = useState(CONTENT[0]);

  const changeImgHandler = (index) => setCurrentImg(CONTENT[index]);

  const activePointerHandler = (id) =>
    currentImg.id === id ? styles.activePointer : '';

  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Get started</h1>
      <small className={styles.smallText}>Start with sign up or login!</small>

      <div className={styles.imgContainer}>
        {currentImg.img}

        <small className={styles.imgContent}>{currentImg.description}</small>

        <div>
          <span
            className={`${styles.pointer} ${activePointerHandler(1)}`}
            onClick={() => changeImgHandler(0)}
          ></span>
          <span
            className={`${styles.pointer} ${activePointerHandler(2)}`}
            onClick={() => changeImgHandler(1)}
          ></span>
          <span
            className={`${styles.pointer} ${activePointerHandler(3)}`}
            onClick={() => changeImgHandler(2)}
          ></span>
        </div>
      </div>

      <button
        className={`${styles.button} ${styles.buttonSignup}`}
        onClick={() => push('/signup')}
      >
        Sign Up
      </button>

      <button
        className={`${styles.button} ${styles.buttonLogin}`}
        onClick={() => push('/login')}
      >
        Log In
      </button>
    </div>
  );
};

export default Home;
