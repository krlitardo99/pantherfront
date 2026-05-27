import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getClientsRequest,
  getClientByIdRequest,
  createClientRequest,
  updateClientRequest,
  deleteClientRequest,
} from "../services/clientsApi";

export const fetchClientsAsync = createAsyncThunk(
  "clients/fetchClients",
  async (_, thunkAPI) => {
    try {
      return await getClientsRequest();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchClientByIdAsync = createAsyncThunk(
  "clients/fetchClientById",
  async (id, thunkAPI) => {
    try {
      return await getClientByIdRequest(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createClientAsync = createAsyncThunk(
  "clients/createClient",
  async (data, thunkAPI) => {
    try {
      return await createClientRequest(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateClientAsync = createAsyncThunk(
  "clients/updateClient",
  async ({ id, data }, thunkAPI) => {
    try {
      return await updateClientRequest(id, data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteClientAsync = createAsyncThunk(
  "clients/deleteClient",
  async (id, thunkAPI) => {
    try {
      await deleteClientRequest(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  clients: [],
  clientSelected: null,
  loading: false,
  error: null,
};

const clientsSlice = createSlice({
  name: "clients",

  initialState,

  reducers: {},

  extraReducers: (builder) => {

    builder

      // GET PRODUCTS
      .addCase(fetchClientsAsync.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchClientsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })

      .addCase(fetchClientsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET PRODUCT BY ID
      .addCase(fetchClientByIdAsync.fulfilled, (state, action) => {
        state.clientSelected = action.payload;
      })

      // CREATE
      .addCase(createClientAsync.fulfilled, (state, action) => {
        state.clients.unshift(action.payload);
      })

      // UPDATE
      .addCase(updateClientAsync.fulfilled, (state, action) => {

        state.clients = state.clients.map((client) =>
          client.id === action.payload.id
            ? action.payload
            : client
        );

        state.clientSelected = action.payload;
      })

      // DELETE
      .addCase(deleteClientAsync.fulfilled, (state, action) => {

        state.clients = state.clients.filter(
          (client) => client.id !== action.payload
        );
      });
  },
});

export default clientsSlice.reducer;