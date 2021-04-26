import { object, string, array } from 'yup';

export const validationSchema = () =>
  object().shape({
    name: string()
      .required('Uzupełnij to pole')
      .min(5, 'Nazwa musi mieć przynajmniej 5 znaków')
      .max(100, 'Nazwa może mieć maksymalnie 100 znaków'),
    description: string().required('Uzupełnij to pole'),
    email: string().required('Uzupełnij to pole').email('Niepoprawny Email'),
    tags: array().min(1, 'Dodaj przynajmniej jeden tag'),
    image: string().required('Wybierz zdjęcie'),
  });
