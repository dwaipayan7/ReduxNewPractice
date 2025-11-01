import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../../api/api';

const initialState = {
  cartData: [] as any,
  totalAmount: 0,
};

const cartSlice = createSlice({
  initialState: initialState,
  name: 'cartSlice',
  reducers: {
    addToCart: (state, action) => {
      //   const { cartData } = state;
      //   const itemPresentIndex = cartData.findIndex(
      //     item.id === action.payload.id,
      //   );

      const existingIndex = state.cartData.findIndex(
        (item: any) => item.id === action.payload.id,
      );

      if (existingIndex !== -1) {
        state.cartData[existingIndex].quantity += 1;
      } else {
        state.cartData.push({ ...action.payload, quantity: 1 });
      }

      //total
      state.totalAmount = state.cartData.reduce(
        (sum: any, item: any) => sum + item.price * item.quantity,
        0,
      );

      //   if (itemPresentIndex !== -1) {
      //     const updatedCartData = [...cartData];
      //     updatedCartData[itemPresentIndex] = {
      //       ...updatedCartData[itemPresentIndex],
      //       quantity: updatedCartData[itemPresentIndex].quantity + 1,
      //     };
      //     const total = updatedCartData.reduce(
      //       (accumulator, currentItem) =>
      //         accumulator + currentItem.price * currentItem.quantity,
      //       0,
      //     );

      //     return {
      //       ...state,
      //       cartData: updatedCartData,
      //       totalAmount: total,
      //     };
      //   }
    },
    removeFromCart: (state, action) => {
      const existingIndex = state.cartData.findIndex(
        (item: any) => item.id === action.payload.id,
      );

      if (existingIndex !== -1) {
        if (state.cartData[existingIndex].quantity > 1) {
          state.cartData[existingIndex].quantity -= 1;
        }
      } else {
        // state.cartData.push({ ...action.payload, quantity: 1 });
        state.cartData.splice(existingIndex, 1);
      }

      //total
      state.totalAmount = state.cartData.reduce(
        (sum: any, item: any) => sum + item.price * item.quantity,
        0,
      );
    },
    clearCart: state => {
      state.cartData = [];
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
