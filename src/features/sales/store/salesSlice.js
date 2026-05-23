import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getSalesRequest,
  getSaleByIdRequest,
  createSaleRequest,
} from "../services/salesApi";

export const fetchSalesAsync = createAsyncThunk(
  "sales/fetchSales",
  async (_, thunkAPI) => {
    try {
      return await getSalesRequest();
    } catch (error) {
      console.log(error);

      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const fetchSaleByIdAsync = createAsyncThunk(
  "sales/fetchSaleById",
  async (idSale, thunkAPI) => {
    try {
      return await getSaleByIdRequest(idSale);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const createSaleAsync = createAsyncThunk(
  "sales/createSale",

  async (saleData, thunkAPI) => {
    try {
      return await createSaleRequest(saleData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

const salesSlice = createSlice({
  name: "sales",

  initialState: {
    sales: [],

    saleSelected: null,

    loading: false,

    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // LIST SALES

      .addCase(fetchSalesAsync.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchSalesAsync.fulfilled, (state, action) => {
        state.loading = false;

        state.sales = action.payload;
      })

      .addCase(fetchSalesAsync.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // GET SALE BY ID

      .addCase(fetchSaleByIdAsync.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchSaleByIdAsync.fulfilled, (state, action) => {
        state.loading = false;

        state.saleSelected = action.payload;

        state.error = null;
      })

      .addCase(fetchSaleByIdAsync.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      //CREATE SALE
      .addCase(createSaleAsync.fulfilled, (state, action) => {
        state.sales.unshift(action.payload);
      });
  },
});

export default salesSlice.reducer;
