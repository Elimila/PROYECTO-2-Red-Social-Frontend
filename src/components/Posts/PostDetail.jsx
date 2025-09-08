import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AddComment from "./AddComment"; // Importamos AddComment

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [refresh, setRefresh] = useState(false); // Para recargar comentarios si se desea

  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.error("Error al cargar el post:", err));
  }, [id, refresh]);

  const handleCommentAdded = () => {
    setRefresh(!refresh); // Forzamos recarga si en el futuro mostramos comentarios
  };

  if (!post) return <p>Cargando...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{post.title}</h2>
      <p><strong>Autor:</strong> {post.author?.name}</p>
      <p>{post.content}</p>
      {post.image && (
        <img
          src={`http://localhost:3000/uploads/${post.image}`}
          alt="Post"
          style={{ maxWidth: "100%", marginTop: "1rem" }}
        />
      )}

      {/* Añadimos el formulario para comentar */}
      <AddComment postId={id} onCommentAdded={handleCommentAdded} />
    </div>
  );
};

export default PostDetail;



