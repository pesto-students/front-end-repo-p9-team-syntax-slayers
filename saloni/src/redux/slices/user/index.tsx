import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { longlat, GeoAddress } from '../../../global.d';

interface UserDetails {
  userId: string;
  email: string;
  firstName: string;
  userType: string;
  profilePicUrl: string;
  userLocation?: longlat;
  GeoAddress?: GeoAddress;
  // Note: `isLoggedIn` and `token` are already part of `initialState` and don't need to be in this payload.
}

const initialState = {
  userId: '',
  email: '',
  firstName: '',
  userType: '',
  profilePicUrl: '',
  isLoggedIn: false,
  token: '',
  userLocation: {
    lat: 12.9299,
    lon: 77.5822,
  },
  GeoAddress: {
    formatted: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state) => {
      const tokenValue = localStorage.getItem('token');
      if (tokenValue) {
        console.log("The key 'token' exists in localStorage.");
        if (tokenValue) {
          const decodedToken: UserDetails = jwtDecode(tokenValue);
          console.log(decodedToken);
          state.token = tokenValue;
          state.isLoggedIn = true;
          state.email = decodedToken.email;
          state.firstName = decodedToken.firstName;
          state.userId = decodedToken.userId;
          state.userType = decodedToken.userType;
          state.profilePicUrl = decodedToken.profilePicUrl;
          localStorage.setItem('type', decodedToken.userType);
        }
      } else {
        console.log("The key 'token' does not exist in localStorage.");
      }
    },
    removeToken: (state) => {
      Object.assign(state, initialState);
      localStorage.removeItem('token');
      localStorage.removeItem('type');
    },
    setGeoAddress: (state, action: PayloadAction<GeoAddress>) => {
      const { formatted, city, country, postalCode } = action.payload;
      return {
        ...state,
        GeoAddress: {
          ...state.GeoAddress,
          formatted: formatted || '',
          city: city || '',
          country: country || '',
          postalCode: postalCode || '',
        },
      };
    },
    setUserLocation: (state, action: PayloadAction<longlat>) => {
      const { lat, lon } = action.payload;
      return {
        ...state,
        userLocation: {
          ...state.userLocation,
          lat: lat || 0,
          lon: lon || 0,
        },
      };
    },
  },
});

export const { setToken, removeToken, setGeoAddress, setUserLocation } =
  userSlice.actions;

export default userSlice.reducer;
