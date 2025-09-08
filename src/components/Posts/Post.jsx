import { Link } from "react-router-dom"

const Post = ({ post }) => {
  return (
    <div style={{ borderBottom: "1px solid #ccc", marginBottom: "1rem" }}>
      <Link to={`/post/${post._id}`} style={{ textDecoration: "none", color: "black" }}>
        <h4>{post.title}</h4>
      </Link>

      {post.image && (
        <img
          src={`http://localhost:3000/uploads/${post.image}`}
          alt="Imagen del post"
          style={{ width: "100%", maxHeight: "300px", objectFit: "cover", marginBottom: "1rem" }}
        />
      )}

      <p><strong>Autor:</strong> {post.author?.name}</p>
      <p>{post.content.slice(0, 100)}...</p>
    </div>
  )
}

export default Post


