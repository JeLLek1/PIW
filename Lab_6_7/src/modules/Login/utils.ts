import { object, string } from 'yup';
import { useState } from 'react';
import { auth } from 'utils/firebase';

export const validationSchema = () =>
  object().shape({
    email: string().required('Uzupełnij to pole').email('Nieprawidłowy email'),
    password: string().required('Uzupełnij to pole'),
  });
export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const initialLoginData: ILoginData = {
    email: '',
    password: '',
  };

  const logIn = ({ email, password }: ILoginData) => {
    setIsLoading(true);
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {})
      .catch(error => {
        if (
          error.code === 'auth/user-not-found' ||
          error.code === 'auth/wrong-password'
        ) {
          setError('Nieprawidłowy login lub hasło');
        } else {
          setError('Błąd podczas przetwarzania');
        }
        console.log(error.code);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return { isLoading, error, initialLoginData, logIn };
};
