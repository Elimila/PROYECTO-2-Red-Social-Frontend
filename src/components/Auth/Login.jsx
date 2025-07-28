import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, reset } from '../../redux/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { notification } from 'antd'

// Componente de login
const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const { email, password } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isSuccess) {
      notification.success({ message: 'Éxito', description: message })
      setTimeout(() => {
        navigate('/profile')
      }, 1000)
    }

    if (isError) {
      notification.error({ message: 'Error', description: message })
    }

    dispatch(reset())
  }, [isSuccess, isError, message, dispatch, navigate])

  const onChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(login(formData))
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="email" name="email" value={email} onChange={onChange} placeholder="Correo" />
      <input type="password" name="password" value={password} onChange={onChange} placeholder="Contraseña" />
      <button type="submit">Iniciar sesión</button>
    </form>
  )
}

export default Login

