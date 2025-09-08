// Importamos configureStore de Redux Toolkit
import { configureStore } from '@reduxjs/toolkit'

// Importamos los reducers
import authReducer from './auth/authSlice'
import postReducer from './post/postSlice'
import commentReducer from './comment/commentSlice'

// Creamos y exportamos el store con los reducers
export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    comment: commentReducer,
  },
})

