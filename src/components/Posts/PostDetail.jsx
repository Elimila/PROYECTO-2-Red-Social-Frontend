import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error("Error al cargar el post:", err));
  }, [id]);

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
    </div>
  );
};

export default PostDetail;


