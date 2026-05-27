import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/store/authSlice";
import salesReducer from "../features/sales/store/salesSlice";
import productsReducer from "../features/products/store/productsSlice";
import clientsReducer from "../features/clients/store/clientsSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sales: salesReducer,
    products: productsReducer,
    clients: clientsReducer
  },
});