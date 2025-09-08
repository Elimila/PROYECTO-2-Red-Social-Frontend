import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// ✅ Importación corregida para que coincida con la exportación con nombre
import { getAllPosts } from './postService';

const initialState = {
  posts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// La acción asíncrona ahora llama a la función importada directamente
export const getPosts = createAsyncThunk('post/get', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    return await getAllPosts(token);
  } catch (error) {
    const message =
      error.response?.data?.message || 'Error al obtener las publicaciones';
    return thunkAPI.rejectWithValue(message);
  }
});

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;