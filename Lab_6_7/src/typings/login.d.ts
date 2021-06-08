interface ILoginState {
  isLoading: boolean;
  user?: firebase.User;
}

interface ILoginData {
  email: string;
  password: string;
}

interface IRegisterData {
  email: string;
  password: string;
  passwordConfirm: string;
}
