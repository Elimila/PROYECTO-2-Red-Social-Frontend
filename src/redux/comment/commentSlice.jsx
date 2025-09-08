import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import commentService from './commentService';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

export const createComment = createAsyncThunk(
  'comment/create',
  async ({ postId, formData, token }, thunkAPI) => {
    try {
      return await commentService.createComment(postId, formData, token);
    } catch (error) {
      const message =
        error.response?.data?.message || 'Error al crear comentario';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    resetComment: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message || 'Comentario creado';
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetComment } = commentSlice.actions;
export default commentSlice.reducer;
