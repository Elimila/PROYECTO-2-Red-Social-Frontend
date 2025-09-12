import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditPost = () => {
  const { id } = useParams(); // ✅ ID del post desde la URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  // ✅ Cargar datos del post existente
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/posts/${id}`);
        setFormData({
          title: res.data.title,
          content: res.data.content,
          image: null,
        });
        if (res.data.image) {
          setPreview(`http://localhost:3000/uploads/${res.data.image}`);
        }
      } catch (error) {
        console.error("Error al cargar el post:", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Enviar actualización
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const form = new FormData();
      form.append("title", formData.title);
      form.append("content", formData.content);
      if (formData.image) form.append("image", formData.image);

      await axios.put(`http://localhost:3000/posts/${id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/profile"); // ✅ vuelve al perfil después de editar
    } catch (error) {
      console.error("Error al actualizar el post:", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Editar publicación</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Título"
          required
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Escribe tu contenido..."
          rows="5"
          required
        />
        <input type="file" onChange={handleFileChange} />
        {preview && (
          <img
            src={preview}
            alt="preview"
            style={{ width: "100%", borderRadius: "8px", marginTop: "1rem" }}
          />
        )}
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default EditPost;
