import { useEffect } from 'react';
import { auth } from 'utils/firebase';
import { useDispatch } from 'react-redux';
import { setLoginData } from 'store/login/reducers';

export const useApp = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        dispatch(setLoginData({ isLoading: false, user: user }));
      } else {
        dispatch(setLoginData({ isLoading: false, user: null }));
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return {};
};
