import { useState } from "react"
import axios from "axios"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const AddPost = () => {
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", title)
    formData.append("content", content)
    if (image) formData.append("image", image)

    try {
      await axios.post("http://localhost:3000/posts", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // 👈 corrección aquí
          "Content-Type": "multipart/form-data"
        }
      })
      alert("✅ Post creado con éxito")
      navigate("/home")
    } catch (err) {
      console.error("❌ Error al crear el post:", err)
    }
  }

  return (
    <div className="add-post">
      <h2>Crear nueva publicación</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Contenido"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Publicar</button>
      </form>
    </div>
  )
}

export default AddPost
