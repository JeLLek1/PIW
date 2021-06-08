interface IPizza {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number[];
}

interface IIngredient {
  name: string;
  id: string;
  price: number[];
}

interface IPizzaSingleState {
  isCustom: boolean;
  id: string | null;
  name: string;
  customAddOns: IIngredient[];
  size: 0 | 1 | 2;
  price: number;
  key: number;
}

interface ICartItem {
  isCustom: boolean;
  id: string | null;
  name: string;
  customAddOns: IIngredient[];
  size: 0 | 1 | 2;
  price: number;
}

interface IPizzaState {
  count: number;
  lastKey: number;
  price: number;
  pizzas: IPizzaSingleState[];
}

interface IOrderIngredient {
  id: string;
  name: string;
}

interface IOrder {
  isCustom: boolean;
  name: string;
  customAddOns: IOrderIngredient[];
  size: 0 | 1 | 2;
  price: number;
}
