import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, reset } from '../../redux/auth/authSlice'
import { useNavigate, useLocation } from 'react-router-dom'
import { notification } from 'antd'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const { email, password } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [justRegistered, setJustRegistered] = useState(false)

  const { isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (location.state?.registered && !justRegistered) {
      setJustRegistered(true)
      notification.success({
        message: 'Registro exitoso',
        description: location.state.message || 'Ahora puedes iniciar sesión',
      })
    }
  }, [location, justRegistered])

  useEffect(() => {
    if (isSuccess) {
      notification.success({ message: 'Éxito', description: message })
      setTimeout(() => navigate('/profile'), 1000)
    }
    if (isError) {
      notification.error({ message: 'Error', description: message })
    }
    dispatch(reset())
  }, [isSuccess, isError, message, dispatch, navigate])

  const onChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(login(formData))
  }

  return (
    <div className="auth-page">
      <div className="form-container">
        <h2>Iniciar sesión</h2>
        <form onSubmit={onSubmit}>
          <input type="email" name="email" value={email} onChange={onChange} placeholder="Correo" />
          <input type="password" name="password" value={password} onChange={onChange} placeholder="Contraseña" />
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
    </div>
  )
}

export default Login




