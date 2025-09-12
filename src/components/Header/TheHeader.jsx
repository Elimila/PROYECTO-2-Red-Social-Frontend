import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/auth/authSlice'

const TheHeader = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <header className="main-header">
      <nav className="nav-bar">
        {/* ✅ Cambiado el nombre de la marca */}
        <h1 className="brand">BiTViral</h1>
        <div className="nav-links">
          {user ? (
            <>
              <Link to="/home">Home</Link>
              <Link to="/profile">Perfil | {user.name}</Link>
              <Link to="/add-post">Crear Post</Link>
              <button onClick={onLogout}>Cerrar sesión</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Registro</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default TheHeader



