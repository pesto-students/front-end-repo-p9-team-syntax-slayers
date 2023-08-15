import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ServiceCardProps } from '../../../components/ServiceCard/ServiceCard';

export interface BasicUser {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  profile_pic_url?: string;
  type: 'salon_admin' | 'user';
  password?: string;
  token?: string;
  cartList: [];
}

const initialState: BasicUser = {
  id: '',
  email: '',
  firstname: '',
  lastname: '',
  profile_pic_url: '',
  type: 'user',
  password: '',
  token: '',
  cartList: [],
};

export const userSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addToList: (state, action: PayloadAction<ServiceCardProps>) => {
    //   state.cartList.push(action.payload);
    // },
    // removeFromList: (state, action: PayloadAction<ServiceCardProps>) => {
    //   const index = state.cartList.findIndex(
    //     (item) => item.id === action.payload.id,
    //   );
    //   if (index >= 0) {
    //     state.cartList.splice(index, 1);
    //   }
    // },
    emptyCart: (state) => {
      state.cartList = [];
    },
  },
});

export const {
  //  addToList, removeFromList,
  emptyCart,
} = userSlice.actions;

export default userSlice.reducer;
