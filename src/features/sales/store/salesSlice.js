import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getSalesRequest,
  getSaleByIdRequest,
  createSaleRequest,
  updateSalesDetail,
  deleteSalesDetail,
  deleteSale,
  updateSale
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

export const updateSalesDetailAsync = createAsyncThunk(
  "sales/updateSalesDetail",

  async ({ id, data }, thunkAPI) => {
    try {
      return await updateSalesDetail(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);
export const deleteSalesDetailAsync = createAsyncThunk(
  "sales/deleteSalesDetail",

  async (id, thunkAPI) => {
    try {
      await deleteSalesDetail(id);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const deleteSaleAsync = createAsyncThunk(
  "sales/deleteSale",

  async (id, thunkAPI) => {
    try {
      await deleteSale(id);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const updateSaleAsync = createAsyncThunk(
  "sales/updateSale",

  async ({ id, data }, thunkAPI) => {

    try {

      return await updateSale(
        id,
        data
      );

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data
      );

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
      })

      .addCase(updateSalesDetailAsync.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(deleteSalesDetailAsync.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(deleteSaleAsync.fulfilled, (state, action) => {
        state.loading = false;

        state.sales = state.sales.filter((sale) => sale.id !== action.payload);
      })

      .addCase(updateSaleAsync.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateSaleAsync.fulfilled, (state, action) => {
        state.loading = false;

        state.saleSelected = action.payload;
      })

      .addCase(updateSaleAsync.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export default salesSlice.reducer;
