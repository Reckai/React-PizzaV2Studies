
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { calcTotalPrice } from '../../../utils/calcTotalPrice';
import { getCartFromLs } from '../../../utils/getCartFromLS';

import { TCartItem, ICartSliceState } from './types';


const cartData = getCartFromLs();


const initialState: ICartSliceState = {
  totalPrice: cartData.totalPrice,
  items: cartData.items,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    addItem(state, action:PayloadAction<TCartItem>) {
      const findItem = state.items.find(obj => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;

      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });

      }
      state.totalPrice = calcTotalPrice(state.items)
    },
    minusItem(state, action:PayloadAction<string>) {
      const findItem = state.items.find(obj => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
        state.totalPrice -= findItem.price
      }
      if (findItem && findItem.count <= 0) {
        state.items = state.items.filter(obj => obj.id !== action.payload);
      }
    },

    removeItem(state, action) {
      const findItem = state.items.find(obj => obj.id === action.payload);
      if(findItem){
        state.totalPrice -= findItem.price * findItem.count;
      }
      state.items = state.items.filter(obj => obj.id !== action.payload);

    },
    ClearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    }
  },
})

// Action creators are generated for each case reducer function
export const { addItem, removeItem, ClearItems, minusItem } = cartSlice.actions

export default cartSlice.reducer