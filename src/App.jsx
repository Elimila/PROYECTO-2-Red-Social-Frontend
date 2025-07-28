// Importamos React y los componentes
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'

// Importamos Router
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Componente principal
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

