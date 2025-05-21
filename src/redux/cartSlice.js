import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: JSON.parse(localStorage.getItem('cartItems')) || []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    addToCart(state, action) {
      const { product, quantity } = action.payload;
      const existing = state.items.find(item => item.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },

    updateCart(state, action) {
      const { product, quantity } = action.payload;
      const item = state.items.find(item => item.id === product.id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },


    removeFromCart(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload.id);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    clearCart(state) {
      state.items = [];
      localStorage.setItem('cartItems', JSON.stringify([]));
    }
  }
});

export const { addToCart, removeFromCart, clearCart,updateCart  } = cartSlice.actions;
export default cartSlice.reducer;
