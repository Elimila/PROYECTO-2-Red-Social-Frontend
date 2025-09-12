import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'

import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import TheHeader from './components/Header/TheHeader'
import Profile from './components/Profile/Profile'
import Footer from './components/Footer/Footer'
import Home from './components/Home/Home'
import PostDetail from './components/Posts/PostDetail'
import AddPost from './components/Posts/AddPost'

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <BrowserRouter>
          <TheHeader />
          <Routes>
            {/* Esta es la línea que soluciona el problema */}
            <Route path='/' element={<Navigate to='/home' />} />
            
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/home' element={<Home />} />
            <Route path='/post/:id' element={<PostDetail />} />
            <Route path='/add-post' element={<AddPost />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </Provider>
  )
}

export default App



