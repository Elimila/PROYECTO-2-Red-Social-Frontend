import { useState } from 'react'

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
      <input type="text" name="firstName" value={firstName} onChange={onChange} />
      <input type="text" name="username" value={username} onChange={onChange} />
      <input type="email" name="email" value={email} onChange={onChange} />
      <input type="password" name="password" value={password} onChange={onChange} />
      <input type="password" name="password2" value={password2} onChange={onChange} />
      <button type="submit">Registrarse</button>
    </form>
  )
}

export default Register
