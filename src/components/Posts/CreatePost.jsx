import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/post/postSlice";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <p>Debes iniciar sesión para crear un post</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    if (formData.image) data.append("image", formData.image);

    dispatch(createPost(data));
    navigate("/home");
  };

  return (
    <div className="createpost-container">
      <form onSubmit={handleSubmit}>
        <h2>Crear publicación</h2>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Escribe tu publicación..."
          value={formData.content}
          onChange={handleChange}
          required
        />
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Publicar</button>
      </form>
    </div>
  );
};

export default CreatePost;
