import { configureStore, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../slices/apiSlice";
import cartSliceReducer from "../slices/cartSlice";
import authSliceReducer from "../slices/authSlice";

//const initialState = { x: 0 };

// const demoSlice = createSlice({
//   name: "demo",
//   initialState: initialState,
//   reducers: {
//     increment(state) {
//       state.x++;
//     },
//   },
// });

const rootReducer = {
  // Other reducers...
  [apiSlice.reducerPath]: apiSlice.reducer,
  cart: cartSliceReducer,
  auth: authSliceReducer,
};

const store = configureStore({
  //reducer: demoSlice.reducer,
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

//export const demoActions = demoSlice.actions;

export default store;
