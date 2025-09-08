import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createComment, resetComment } from '../../redux/comment/commentSlice'
import { useEffect } from 'react'
import { message, Button, Input } from 'antd'

const AddComment = ({ postId, onCommentAdded }) => {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { isSuccess, isError, message: msg } = useSelector((state) => state.comment)

  const [content, setContent] = useState('')
  const [image, setImage] = useState(null)

  // Mostrar notificaciones de éxito o error
  useEffect(() => {
    if (isSuccess) {
      message.success('Comentario publicado con éxito 😎')
      setContent('')
      setImage(null)
      onCommentAdded() // para recargar lista si lo usas
    }
    if (isError) {
      message.error(msg)
    }
    dispatch(resetComment())
  }, [isSuccess, isError, msg, dispatch, onCommentAdded])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!content.trim()) return message.warning('El comentario no puede estar vacío')

    const formData = new FormData()
    formData.append('content', content)
    if (image) formData.append('image', image)

    dispatch(createComment({ postId, formData, token }))
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
      <h4>Agregar comentario</h4>

      <Input.TextArea
        rows={4}
        placeholder="Escribe tu comentario aquí..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        style={{ marginTop: '1rem' }}
      />

      <Button type="primary" htmlType="submit" style={{ marginTop: '1rem' }}>
        Publicar comentario
      </Button>
    </form>
  )
}

export default AddComment
