import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API } from '../../api/api';


const initialState = {
  userData: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

//login
export const login = createAsyncThunk('auth', async (params, thunkApi) => {
  console.log('AuthSlice: ', params);

  try {
    const response = await API.post('auth/login', params);
    console.log('The Login Response: ', response);

    return response.data;

    // return thunkApi.fulfillWithValue('')
  } catch (error) {
    console.log('Getting Error AuthSlice: ', error);
    return thunkApi.rejectWithValue(error);
  }
});

const authSlice = createSlice({
  initialState: initialState,
  name: 'authSlice',
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userData = action.payload;
      })
      .addCase(login.rejected, state => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default authSlice.reducer;
