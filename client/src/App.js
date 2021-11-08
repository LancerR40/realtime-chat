import Public from './auth/Public';
import Private from './auth/Private';

import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { authVerifyAction } from './store/actions/authActions';

const App = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.isAuth);

  useEffect(() => {
    dispatch(authVerifyAction());
  }, []);

  return isAuth === false ? <Public /> : <Private />;
};

export default App;
