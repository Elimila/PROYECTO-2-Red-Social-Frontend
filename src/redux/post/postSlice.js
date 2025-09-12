import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as postService from './postService'

const initialState = {
  posts: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
}

// Acción asíncrona para obtener todos los posts
export const getAllPosts = createAsyncThunk(
  'posts/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token
      return await postService.getAllPosts(token)
    } catch (error) {
      const message =
        error.response?.data?.message || 'Error al obtener los posts'
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Acción asíncrona para dar/quitar like a un post
export const toggleLike = createAsyncThunk(
  'posts/toggleLike',
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token
      if (!token) {
        return thunkAPI.rejectWithValue('Inicia sesión para dar like a un post')
      }
      const response = await postService.toggleLikePost(postId, token)
      return response.post
    } catch (error) {
      const message = error.response?.data?.message || 'Error al dar like'
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Acción asíncrona para eliminar un post
export const deletePost = createAsyncThunk(
  'posts/delete',
  async (postId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token
      if (!token) {
        return thunkAPI.rejectWithValue('Inicia sesión para eliminar un post')
      }
      await postService.deletePost(postId, token)
      return postId
    } catch (error) {
      const message = error.response?.data?.message || 'Error al eliminar el post'
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Acción asíncrona para crear un post
export const createPost = createAsyncThunk(
  'posts/create',
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token
      if (!token) {
        return thunkAPI.rejectWithValue('Inicia sesión para crear un post')
      }
      const response = await postService.createPost(postData, token)
      return response.post
    } catch (error) {
      const message = error.response?.data?.message || 'Error al crear el post'
      return thunkAPI.rejectWithValue(message)
    }
  }
)

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    resetPost: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      // Casos para getAllPosts
      .addCase(getAllPosts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts = action.payload
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      // Casos para toggleLike
      .addCase(toggleLike.fulfilled, (state, action) => {
        const updatedPost = action.payload
        state.posts = state.posts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
      })
      .addCase(toggleLike.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
      })
      // Casos para deletePost
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload)
        state.isSuccess = true
        state.message = 'Post eliminado con éxito'
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
      })
      // Casos para createPost
      .addCase(createPost.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.posts.unshift(action.payload)
        state.message = 'Post creado con éxito'
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { resetPost } = postSlice.actions
export default postSlice.reducer