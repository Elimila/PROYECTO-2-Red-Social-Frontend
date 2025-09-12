// src/redux/comment/commentSlice.jsx

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import commentService from './commentService'

const initialState = {
  comments: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
}

// Acción asíncrona para crear un comentario
export const createComment = createAsyncThunk(
  'comment/create',
  async ({ postId, formData, token }, thunkAPI) => {
    try {
      return await commentService.createComment(postId, formData, token)
    } catch (error) {
      const message =
        error.response?.data?.message || 'Error al crear comentario'
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Acción asíncrona para traer los comentarios por ID de post
export const fetchComments = createAsyncThunk(
  'comment/fetchComments',
  async (postId, thunkAPI) => {
    try {
      return await commentService.getCommentsByPost(postId)
    } catch (error) {
      return thunkAPI.rejectWithValue('Error al cargar los comentarios')
    }
  }
)

// Acción asíncrona para actualizar un comentario
export const updateComment = createAsyncThunk(
  'comment/update',
  async ({ commentId, formData, token }, thunkAPI) => {
    try {
      return await commentService.updateComment(commentId, formData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

// Acción asíncrona para eliminar un comentario
export const deleteComment = createAsyncThunk(
  'comment/delete',
  async ({ commentId, token }, thunkAPI) => {
    try {
      await commentService.deleteComment(commentId, token)
      return commentId // Devuelve el ID para filtrar en el estado
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

// Acción asíncrona para dar like a un comentario
export const likeComment = createAsyncThunk(
  'comment/like',
  async ({ commentId, token }, thunkAPI) => {
    try {
      return await commentService.likeComment(commentId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

// Acción asíncrona para quitar like a un comentario
export const unlikeComment = createAsyncThunk(
  'comment/unlike',
  async ({ commentId, token }, thunkAPI) => {
    try {
      return await commentService.unlikeComment(commentId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    resetComment: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // Agrega el nuevo comentario al principio del array
        state.comments.unshift(action.payload.comment) 
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.comments = action.payload // Asigna los comentarios
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const updatedComment = action.payload.comment
        state.comments = state.comments.map((comment) =>
          comment._id === updatedComment._id ? updatedComment : comment
        )
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        // Elimina el comentario del estado
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.payload
        )
      })
      .addCase(likeComment.fulfilled, (state, action) => {
        const updatedComment = action.payload.comment
        state.comments = state.comments.map((comment) =>
          comment._id === updatedComment._id ? updatedComment : comment
        )
      })
      .addCase(unlikeComment.fulfilled, (state, action) => {
        const updatedComment = action.payload.comment
        state.comments = state.comments.map((comment) =>
          comment._id === updatedComment._id ? updatedComment : comment
        )
      })
  },
})

export const { resetComment } = commentSlice.actions
export default commentSlice.reducer