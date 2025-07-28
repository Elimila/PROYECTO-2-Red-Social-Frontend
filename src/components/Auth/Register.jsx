import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register, reset } from '../../redux/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { notification } from 'antd'

// Componente de registro
const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    username: '',
    email: '',
    password: '',
    password2: '',
  })

  const { firstName, username, email, password, password2 } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isSuccess) {
      notification.success({ message: 'Éxito', description: message })
      navigate('/login')
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

    if (password !== password2) {
      return notification.error({
        message: 'Error',
        description: 'Las contraseñas no coinciden',
      })
    }

    dispatch(register(formData))
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="firstName" value={firstName} onChange={onChange} placeholder="Nombre" />
      <input type="text" name="username" value={username} onChange={onChange} placeholder="Usuario" />
      <input type="email" name="email" value={email} onChange={onChange} placeholder="Correo" />
      <input type="password" name="password" value={password} onChange={onChange} placeholder="Contraseña" />
      <input type="password" name="password2" value={password2} onChange={onChange} placeholder="Repetir contraseña" />
      <button type="submit">Registrarse</button>
    </form>
  )
}

export default Register

