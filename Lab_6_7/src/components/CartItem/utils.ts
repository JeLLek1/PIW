import { useDispatch } from 'react-redux';
import { deleteItem } from 'store/cart/reducers';

export const useCartItem = () => {
  const dispath = useDispatch();
  const handleItemDelete = (key: number) => {
    dispath(deleteItem(key));
  };
  return { handleItemDelete };
};
