// Importamos createSlice y createAsyncThunk
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

// Traemos user/token desde localStorage si existen
const user = JSON.parse(localStorage.getItem('user'))
const token = JSON.parse(localStorage.getItem('token'))

// Estado inicial
const initialState = {
  user: user || null,
  token: token || null,
  isError: false,
  isSuccess: false,
  message: '',
}

// Acción asíncrona para registrar
export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
  try {
    return await authService.register(userData)
  } catch (error) {
    const message = error.response?.data?.errors?.map((err) => err.msg).join(' | ')
    return thunkAPI.rejectWithValue(message)
  }
})

// Acción asíncrona para loguear
export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
  try {
    return await authService.login(userData)
  } catch (error) {
    const message = error.response?.data?.error || 'Error al iniciar sesión'
    return thunkAPI.rejectWithValue(message)
  }
})

// Slice de autenticación
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false
      state.isSuccess = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.isSuccess = true
        state.message = action.payload.message
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        state.isSuccess = true
        state.message = action.payload.message
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true
        state.message = action.payload
      })
  },
})

// Exportamos el reset y el reducer
export const { reset } = authSlice.actions
export default authSlice.reducer


