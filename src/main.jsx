// Importamos React y ReactDOM
import React from 'react'
import ReactDOM from 'react-dom/client'

// Importamos el componente principal
import App from './App.jsx'

// Importamos Provider y la store de Redux
import { Provider } from 'react-redux'
import { store } from './redux/store'

// ✅ Importamos los estilos globales en SASS
import './styles/main.scss'

// Renderizamos la aplicación y le damos acceso a Redux con Provider
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
