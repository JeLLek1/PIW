import { object, string, ref } from 'yup';
import { useState } from 'react';
import { auth } from 'utils/firebase';

export const validationSchema = () =>
  object().shape({
    email: string().required('Uzupełnij to pole').email('Nieprawidłowy email'),
    password: string()
      .required('Uzupełnij to pole')
      .min(6, 'Hasło powinno mieć minimum 6 znaków'),
    passwordConfirm: string()
      .required('Uzupełnij to pole')
      .oneOf([ref('password')], 'Hasła muszą być takie same'),
  });

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const initialRegisterData: IRegisterData = {
    email: '',
    password: '',
    passwordConfirm: '',
  };
  const register = ({ email, password }: IRegisterData) => {
    setIsLoading(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        auth
          .signInWithEmailAndPassword(email, password)
          .then(() => {})
          .catch(error => {
            setError('Błąd podczas przetwarzania');
            console.log('2');
            console.log(error.code);
          });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setError('Ten email jest już w użyciu');
        } else {
          setError('Błąd podczas przetwarzania');
        }
        console.log('1');
        console.log(error.code);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return { isLoading, error, initialRegisterData, register };
};
