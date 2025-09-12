// src/components/Comments/Comment.jsx
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  deleteComment,
  likeComment,
  unlikeComment,
} from '../../redux/comment/commentSlice'
import { Button, Input, message } from 'antd'
import axios from 'axios'

const Comment = ({ comment }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(comment.text)

  const isAuthor = user && user._id === comment.author._id
  const hasLiked =
    user && comment.likes.some((like) => like.toString() === user._id)

  const handleDelete = () => {
    dispatch(deleteComment(comment._id))
  }

  const handleEdit = async () => {
    try {
      const formData = new FormData()
      formData.append('text', editedContent)

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data',
        },
      }

      await axios.put(
        `http://localhost:3000/comments/${comment._id}`,
        formData,
        config
      )
      message.success('Comentario actualizado con éxito')
      setIsEditing(false)
    } catch (error) {
      message.error('Error al actualizar el comentario')
    }
  }

  const handleLike = () => {
    const action = hasLiked ? unlikeComment : likeComment
    dispatch(action(comment._id))
  }

  return (
    <div
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '8px',
        }}
      >
        <img
          src={
            comment.author?.avatar
              ? `http://localhost:3000/uploads/${comment.author.avatar}`
              : 'https://via.placeholder.com/40'
          }
          alt="Avatar"
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            marginRight: '12px',
          }}
        />
        <strong>{comment.author?.name}</strong>
      </div>
      {isEditing ? (
        <Input.TextArea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          rows={3}
        />
      ) : (
        <p>{comment.text}</p>
      )}
      {comment.image && (
        <img
          src={`http://localhost:3000/uploads/${comment.image}`}
          alt="Comentario"
          style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
        />
      )}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '12px',
        }}
      >
        <div>
          <Button
            onClick={handleLike}
            type={hasLiked ? 'primary' : 'default'}
            style={{ marginRight: '8px' }}
          >
            {hasLiked ? '❤️' : '🤍'} {comment.likes.length}
          </Button>
        </div>
        {isAuthor && (
          <div>
            {isEditing ? (
              <>
                <Button onClick={handleEdit} type="primary" style={{ marginRight: '8px' }}>
                  Guardar
                </Button>
                <Button onClick={() => setIsEditing(false)}>Cancelar</Button>
              </>
            ) : (
              <>
                <Button onClick={() => setIsEditing(true)} style={{ marginRight: '8px' }}>
                  Editar
                </Button>
                <Button onClick={handleDelete} danger>
                  Eliminar
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Comment