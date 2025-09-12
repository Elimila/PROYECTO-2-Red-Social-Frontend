import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment, resetComment } from '../../redux/comment/commentSlice';
import { message, Input } from 'antd';

const AddComment = ({ postId, onCommentAdded }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { isSuccess, isError, message: msg } = useSelector((state) => state.comment);

  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  // Mostrar notificaciones de éxito o error
  useEffect(() => {
    if (isSuccess) {
      message.success('Comentario publicado con éxito 😎');
      setContent('');
      setImage(null);
      onCommentAdded();
    }
    if (isError) {
      message.error(msg);
    }
    dispatch(resetComment());
  }, [isSuccess, isError, msg, dispatch, onCommentAdded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return message.warning('El comentario no puede estar vacío');

    const formData = new FormData();
    // ✅ CORRECCIÓN: Ahora el campo se llama 'text' para coincidir con el backend
    formData.append('text', content);
    if (image) formData.append('image', image);

    dispatch(createComment({ postId, formData, token }));
  };

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
      <button
        type="submit"
        style={{
          marginTop: '1rem',
          backgroundColor: '#007bff',
          color: 'white',
          padding: '10px 15px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Publicar
      </button>
    </form>
  );
};

export default AddComment;
