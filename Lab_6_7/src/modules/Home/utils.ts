import { useState, useEffect } from 'react';
import { getPizzas } from 'utils/firebase';

export const useHome = () => {
  const [pizzas, setPizzas] = useState<IPizza[]>([]);
  useEffect(() => {
    getPizzas()
      .then(querySnapshot => {
        const newPizzas: IPizza[] = [];
        querySnapshot.forEach(doc => {
          const pizzaData = doc.data();
          newPizzas.push({
            id: doc.id,
            name: pizzaData.name,
            description: pizzaData.description,
            image: pizzaData.image,
            price: pizzaData.price,
          });
        });
        setPizzas(newPizzas);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  return { pizzas };
};
