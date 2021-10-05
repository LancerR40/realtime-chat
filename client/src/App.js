import Public from './auth/Public';
import Private from './auth/Private';

const App = () => {
  const isAuth = true;

  return isAuth === false ? <Public /> : <Private />;
};

export default App;
