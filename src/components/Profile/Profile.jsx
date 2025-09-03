import { useSelector } from 'react-redux'

// Componente Profile
const Profile = () => {
  // Nos traemos al usuario del estado de Redux
  const { user } = useSelector((state) => state.auth)

  return (
    <div>
      <h1>Perfil</h1>
      <p>Nombre: {user?.firstName}</p>
      <p>Email: {user?.email}</p>
      <img
        src={`http://localhost:3000/${user?.user_img}`}
        alt="Foto de perfil"
        width={200}
      />
    </div>
  )
}

export default Profile
