import Public from './auth/Public';
import Private from './auth/Private';

const App = () => {
  const isAuth = false;

  return isAuth === false ? <Public /> : <Private />;
};

export default App;
