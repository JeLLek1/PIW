import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from 'store/cart/reducers';

export const usePizza = (pizza: IPizza) => {
  const dispatch = useDispatch();
  const [size, setSize] = useState<0 | 1 | 2>(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };
  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };
  const handeSizeChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ) => {
    setSize(event.target.value as 0 | 1 | 2);
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        isCustom: false,
        id: pizza.id,
        name: pizza.name,
        customAddOns: [],
        price: pizza.price[size],
        size: size,
      }),
    );
  };

  return {
    size,
    isDialogOpen,
    handeSizeChange,
    handleAddToCart,
    handleDialogOpen,
    handleDialogClose,
  };
};
