import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../redux/auth/authSlice'

// Componente Header
const TheHeader = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <nav>
      <h1>Red Social</h1>

      {user ? (
        <>
          <button onClick={onLogout}>Cerrar sesión</button>
          <Link to="/">Home</Link>
          <Link to="/profile">Perfil | {user.name}</Link>
          <Link to="/add-post">Crear Post</Link> {/* ✅ Enlace agregado */}
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Registro</Link>
        </>
      )}
    </nav>
  )
}

export default TheHeader
