import { useEffect, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isAuthAction } from './store/action/auth';

const Public = lazy(() => import('./auth/Public'));
const Private = lazy(() => import('./auth/Private'));

const App = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => dispatch(isAuthAction()), []);

  return isAuth === false ? (
    <Suspense fallback={<div></div>}>
      <Public />
    </Suspense>
  ) : (
    <Suspense fallback={<div></div>}>
      <Private />
    </Suspense>
  );
};

export default App;
