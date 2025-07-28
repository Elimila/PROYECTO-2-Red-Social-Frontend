// Importamos configureStore de Redux Toolkit
import { configureStore } from '@reduxjs/toolkit'

// Importamos el slice de auth (aunque esté vacío)
import authReducer from './auth/authSlice'

// Creamos y exportamos el store con el reducer
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
})
