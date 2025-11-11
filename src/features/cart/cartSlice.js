import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: {
      prepare: (id, name, unitPrice) => {
        return {
          payload: { id, name, unitPrice },
        };
      },
      reducer: (state, action) => {
        if (state.cart.find((item) => item.pizzaId === action.payload.id)) {
          const item = state.cart.find(
            (item) => item.pizzaId === action.payload.id,
          );
          item.quantity++;
          item.totalPrice = item.quantity * item.unitPrice;
        } else {
          state.cart.push({
            pizzaId: action.payload.id,
            name: action.payload.name,
            quantity: 1,
            unitPrice: action.payload.unitPrice,
            totalPrice: action.payload.unitPrice,
          });
        }
      },
    },
    removeItem(state, action) {
      // payload -> cartItem ID
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    incrementItemQuantity(state, action) {
      //   payload -> cartItem ID
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decrementItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;

      if (item.quantity === 0) cartSlice.caseReducers.removeItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  incrementItemQuantity,
  decrementItemQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;

export const getCart = (state) => {
  return state.cart.cart;
};

export const getSinglePizzaQuantity = (pizzaId) => (state) => {
  return state.cart.cart.find((item) => item.pizzaId === pizzaId).quantity;
};

export const getTotalCartPrice = (state) => {
  return state.cart.cart.reduce((acc, curr) => acc + curr.totalPrice, 0);
};

export const getTotalNumberOfPizzas = (state) => {
  return state.cart.cart.reduce((acc, curr) => acc + curr.quantity, 0);
};

export default cartSlice.reducer;
