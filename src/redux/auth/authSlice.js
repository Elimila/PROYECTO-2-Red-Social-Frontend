// Importamos createSlice de Redux Toolkit
import { createSlice } from '@reduxjs/toolkit'

// Estado inicial
const initialState = {
  user: null,
  token: null,
}

// Creamos el slice de autenticación
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
})

// Exportamos el reducer
export default authSlice.reducer
