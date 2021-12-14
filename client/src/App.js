import { useEffect, lazy, Suspense } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { isAuthAction } from './store/action/auth';

import AppLayout from './components/layout/AppLayout';

const Public = lazy(() => import('./auth/Public'));
const Private = lazy(() => import('./auth/Private'));

const App = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => dispatch(isAuthAction()), []);

  const notAuthPages = (
    <Suspense fallback={''}>
      <Public />
    </Suspense>
  );

  const isAuthPages = (
    <Suspense fallback={''}>
      <Private />
    </Suspense>
  );

  return <AppLayout>{isAuth === false ? notAuthPages : isAuthPages}</AppLayout>;
};

export default App;
