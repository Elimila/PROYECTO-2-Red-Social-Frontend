import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import TheHeader from './components/Header/TheHeader'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Profile from './components/Profile/Profile'
import Footer from './components/Footer/Footer'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TheHeader />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App


