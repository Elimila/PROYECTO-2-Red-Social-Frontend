import { useState } from 'react'

// Componente de login
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const onChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log('formData', formData)
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="email" name="email" value={email} onChange={onChange} />
      <input type="password" name="password" value={password} onChange={onChange} />
      <button type="submit">Iniciar sesión</button>
    </form>
  )
}

export default Login
