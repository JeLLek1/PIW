import { getOrders } from 'utils/firebase';
import { useEffect, useState } from 'react';
import selectors from 'store/selectors';
import { useSelector } from 'react-redux';

export const useOrders = () => {
  const [orders, setOrders] = useState<IOrderFirebase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector(selectors.getLogin);
  useEffect(() => {
    getOrders(user)
      .then(querySnapshot => {
        const newOrders: IOrderFirebase[] = [];
        querySnapshot.forEach(doc => {
          newOrders.push(doc.data() as IOrderFirebase);
        });
        setOrders(newOrders);
        setIsLoading(false);
      })
      .catch(e => {
        console.log('error :c');
      });
  }, [user]);

  const totalPrice = (order: IOrderFirebase) => {
    let totalPrice = 0;
    order.order.forEach(el => {
      totalPrice += el.price;
    });
    return totalPrice;
  };

  return { orders, isLoading, totalPrice };
};
