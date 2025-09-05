import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register, reset } from '../../redux/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { notification } from 'antd'

// Componente de registro
const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
  })

  const { name, email, password, age } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { isError, isSuccess, message } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isSuccess) {
      notification.success({ message: 'Éxito', description: message })

      // ✅ Redirección con state para mostrar notificación en Login
      setTimeout(() => {
        navigate('/login', {
          state: {
            registered: true,
            message,
          },
        })
        dispatch(reset())
      }, 1000)
    }

    if (isError) {
      notification.error({ message: 'Error', description: message })
      setTimeout(() => dispatch(reset()), 2000)
    }
  }, [isSuccess, isError, message, dispatch, navigate])

  const onChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      name,
      email,
      password,
      age: parseInt(age) || null,
    }

    dispatch(register(userData))
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="name" value={name} onChange={onChange} placeholder="Nombre" />
      <input type="email" name="email" value={email} onChange={onChange} placeholder="Correo" />
      <input type="password" name="password" value={password} onChange={onChange} placeholder="Contraseña" />
      <input type="number" name="age" value={age} onChange={onChange} placeholder="Edad (opcional)" />
      <button type="submit">Registrarse</button>
    </form>
  )
}

export default Register
