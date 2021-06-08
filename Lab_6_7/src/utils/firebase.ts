import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_PROJECT_ID}.firebaseapp.com`,
  projectId: `${process.env.REACT_APP_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_PROJECT_ID}.appspot.com`,
  messagingSenderId: `${process.env.REACT_APP_SENDER_ID}`,
  appId: `${process.env.REACT_APP_APP_ID}`,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const getPizzas = () => firestore.collection('pizzas').get();
export const getIngredients = () => firestore.collection('ingredients').get();
export const addOrder = (order: IOrder[], user: firebase.User) => {
  return firestore.collection('orders').add({
    owner: user.uid,
    dataCreate: firebase.firestore.FieldValue.serverTimestamp(),
    order: order,
  });
};
export const getOrders = (user: firebase.User) =>
  firestore.collection('orders').where('owner', '==', user.uid).get();
