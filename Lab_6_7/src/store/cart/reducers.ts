import { createReducer, createAction } from '@reduxjs/toolkit';

const initialCartState: IPizzaState = {
  count: 0,
  lastKey: 0,
  pizzas: [],
  price: 0,
};

export const addToCart = createAction<ICartItem>('addPizza');
export const emptyCart = createAction('emptyCart');
export const deleteItem = createAction<number>('deleteItem');
export default createReducer(initialCartState, builder => {
  builder.addCase(addToCart, (state, { payload }) => {
    state.count++;
    state.pizzas = [...state.pizzas, { ...payload, key: ++state.lastKey }];
    state.price += payload.price;
  });
  builder.addCase(emptyCart, state => {
    state.count = 0;
    state.lastKey = 0;
    state.pizzas = [];
    state.price = 0;
  });
  builder.addCase(deleteItem, (state, { payload }) => {
    let index = -1;
    state.pizzas.forEach((el, i) => {
      if (el.key === payload) {
        index = i;
      }
    });
    if (index !== -1) {
      state.price -= state.pizzas[index].price;
      state.pizzas.splice(index, 1);
      state.count--;
    }
  });
});
