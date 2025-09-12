// src/components/Posts/PostDetail.jsx
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import AddComment from './AddComment'
import Comment from '../Comments/Comment' // ✅ IMPORTA EL NUEVO COMPONENTE
import { useDispatch, useSelector } from 'react-redux'
import { fetchComments } from '../../redux/comment/commentSlice'

const PostDetail = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [refresh, setRefresh] = useState(false)

  const dispatch = useDispatch()
  const { comments } = useSelector((state) => state.comment)

  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/posts/full/${id}`)
      setPost(res.data)
    } catch (error) {
      console.error('Error al cargar el post:', error)
    }
  }

  useEffect(() => {
    fetchPost()
    dispatch(fetchComments(id))
  }, [id, dispatch, refresh])

  const handleCommentAdded = () => {
    setRefresh((prev) => !prev)
  }

  if (!post) return <p>Cargando post...</p>

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{post.title}</h2>
      <p>{post.content}</p>

      {post.image && (
        <img
          src={`http://localhost:3000/uploads/${post.image}`}
          alt="Post"
          style={{ maxWidth: '100%', marginTop: '1rem' }}
        />
      )}

      <AddComment postId={id} onCommentAdded={handleCommentAdded} />

      <h3 style={{ marginTop: '2rem' }}>Comentarios</h3>
      {comments.length === 0 ? (
        <p>No hay comentarios aún.</p>
      ) : (
        comments.map((comment) => (
          <Comment key={comment._id} comment={comment} /> // ✅ USA EL NUEVO COMPONENTE
        ))
      )}
    </div>
  )
}

export default PostDetail

