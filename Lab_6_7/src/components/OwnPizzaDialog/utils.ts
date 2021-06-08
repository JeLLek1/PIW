import { useState, useEffect } from 'react';
import { getIngredients } from 'utils/firebase';
import { customPizzaPrices } from 'config/pizza';
import { useDispatch } from 'react-redux';
import { addToCart } from 'store/cart/reducers';

export const useOwnPizza = (size: number) => {
  const dispatch = useDispatch();
  const [ingredients, setIngredients] = useState<IIngredient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIngredients, setCurrentIngredients] = useState<IIngredient[]>(
    [],
  );
  const [currentPirce, setCurrentPrice] = useState<number>(
    customPizzaPrices[size],
  );

  const handleIngredientsChange = (newIngredients: IIngredient[]) => {
    let price = customPizzaPrices[size];
    newIngredients.forEach(el => {
      price += el.price[size];
    });
    setCurrentPrice(price);
    setCurrentIngredients([...newIngredients]);
  };

  const handleAdd = () => {
    dispatch(
      addToCart({
        isCustom: true,
        id: null,
        name: 'Własna pizza',
        price: currentPirce,
        customAddOns: [...currentIngredients],
        size: size as 0 | 1 | 2,
      }),
    );
  };

  useEffect(() => {
    getIngredients()
      .then(querySnapshot => {
        const newIngredients: IIngredient[] = [];
        querySnapshot.forEach(doc => {
          const ingredientsData = doc.data();
          newIngredients.push({
            id: doc.id,
            name: ingredientsData.name,
            price: ingredientsData.price,
          });
        });
        setIngredients(newIngredients);
        setIsLoading(false);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  return {
    ingredients,
    isLoading,
    currentIngredients,
    currentPirce,
    handleIngredientsChange,
    handleAdd,
  };
};
