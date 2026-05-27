import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getProductsRequest,
  getProductByIdRequest,
  createProductRequest,
  updateProductRequest,
  deleteProductRequest,
} from "../services/productsApi";

export const fetchProductsAsync = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      return await getProductsRequest();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductByIdAsync = createAsyncThunk(
  "products/fetchProductById",
  async (id, thunkAPI) => {
    try {
      return await getProductByIdRequest(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createProductAsync = createAsyncThunk(
  "products/createProduct",
  async (data, thunkAPI) => {
    try {
      return await createProductRequest(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateProductAsync = createAsyncThunk(
  "products/updateProduct",
  async ({ id, data }, thunkAPI) => {
    try {
      return await updateProductRequest(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  "products/deleteProduct",
  async (id, thunkAPI) => {
    try {
      await deleteProductRequest(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  products: [],
  productSelected: null,
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder

      // GET PRODUCTS
      .addCase(fetchProductsAsync.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET PRODUCT BY ID
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.productSelected = action.payload;
      })

      // CREATE
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
      })

      // UPDATE
      .addCase(updateProductAsync.fulfilled, (state, action) => {

        state.products = state.products.map((product) =>
          product.id === action.payload.id
            ? action.payload
            : product
        );

        state.productSelected = action.payload;
      })

      // DELETE
      .addCase(deleteProductAsync.fulfilled, (state, action) => {

        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      });
  },
});

export default productsSlice.reducer;