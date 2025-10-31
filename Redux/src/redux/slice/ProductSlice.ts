import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../../api/api';

const initialState = {
  products: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

//get all products
export const getAllProducts = createAsyncThunk('product', async thunkApi => {
  // console.log('AuthSlice: ', params);

  try {
    const response = await API.get('/products');
    console.log('The Product Response: ', response);

    return response.data;

    // return thunkApi.fulfillWithValue('')
  } catch (error) {
    console.log('Getting Error ProductSlice: ', error);
    //   return thunkApi.rejectWithValue(error);
  }
});

const productSlice = createSlice({
  initialState: initialState,
  name: 'productSlice',
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllProducts.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default productSlice.reducer;
