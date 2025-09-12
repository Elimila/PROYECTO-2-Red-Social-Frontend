// src/components/Posts/Post.jsx
import { useDispatch, useSelector } from "react-redux"
import { toggleLike } from "../../redux/post/postSlice"
import { Link } from "react-router-dom"

const Post = ({ post }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  // ✅ comprobación segura
  const hasLiked = user ? post.likes.includes(user._id) : false

  const handleLike = () => {
    if (!user) return // ✅ si no hay usuario, no hace nada
    dispatch(toggleLike(post._id))
  }

  return (
    <div className="post-card">
      {/* Header con autor */}
      <div className="post-header">
        <img
          src={post.author?.avatar || "http://via.placeholder.com/40"}
          alt="user"
        />
        <span className="username">{post.author?.name || "Usuario"}</span>
      </div>

      {/* Imagen del post */}
      {post.image && (
        <img
          src={`http://localhost:3000/uploads/${post.image}`}
          alt={post.title}
          className="post-image"
        />
      )}

      {/* Contenido del post */}
      <p className="post-content">{post.content}</p>

      {/* Acciones */}
      <div className="post-actions">
        <button
          onClick={handleLike}
          className={hasLiked ? "liked" : "not-liked"}
          disabled={!user}
        >
          ♥
        </button>
        <span>
          {post.likes.length}{" "}
          {post.likes.length === 1 ? "like" : "likes"}
        </span>
      </div>

      {/* Enlace a detalles */}
      <Link to={`/post/${post._id}`}>Ver detalles</Link>
    </div>
  )
}

export default Post





