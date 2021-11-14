import { useEffect, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isAuthAction } from './store/actions/auth';

import Loading from './components/loading/Loading';

const Public = lazy(() => import('./auth/Public'));
const Private = lazy(() => import('./auth/Private'));

const App = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => dispatch(isAuthAction()), []);

  return isAuth === false ? (
    <Suspense fallback={<Loading />}>
      <Public />
    </Suspense>
  ) : (
    <Suspense fallback={<Loading />}>
      <Private />
    </Suspense>
  );
};

export default App;
