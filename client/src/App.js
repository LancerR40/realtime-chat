import Public from './auth/Public';
import Private from './auth/Private';

import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { isAuthAction } from './store/actions/auth';

const App = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => dispatch(isAuthAction()), []);

  return isAuth === false ? <Public /> : <Private />;
};

export default App;
