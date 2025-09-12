import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { register, reset } from '../../redux/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { notification } from 'antd'

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
      setTimeout(() => {
        navigate('/login', { state: { registered: true, message } })
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
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(register({
      name,
      email,
      password,
      age: parseInt(age) || null,
    }))
  }

  return (
    <div className="auth-page">
      <div className="form-container">
        <h2>Crear cuenta</h2>
        <form onSubmit={onSubmit}>
          <input type="text" name="name" value={name} onChange={onChange} placeholder="Nombre" />
          <input type="email" name="email" value={email} onChange={onChange} placeholder="Correo" />
          <input type="password" name="password" value={password} onChange={onChange} placeholder="Contraseña" />
          <input type="number" name="age" value={age} onChange={onChange} placeholder="Edad (opcional)" />
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  )
}

export default Register


