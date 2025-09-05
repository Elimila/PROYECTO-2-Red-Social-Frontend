import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { logout } from "../../redux/auth/authSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(user?.avatar); // usamos el nombre del archivo

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreview(file.name); // sólo el nombre, no base64
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:3000/users/avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = response.data.user;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      window.location.reload();
    } catch (error) {
      console.error("Error al subir imagen:", error);
    }
  };

  return (
    <div>
      <h2>Perfil</h2>

      {user?.avatar && (
        <img
          src={`http://localhost:3000/uploads/${user.avatar}`}
          alt="Avatar"
          style={{ width: "150px", height: "150px", borderRadius: "50%" }}
        />
      )}

      <p>Nombre: {user?.name}</p>
      <p>Email: {user?.email}</p>

      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Cambiar foto</button>
    </div>
  );
};

export default Profile;



