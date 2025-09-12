// src/components/Posts/CommentList.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ⬇️ Ajusta este import al nombre real del thunk en tu slice
import { getCommentsByPost } from '../../redux/comment/commentSlice';

const CommentList = ({ postId }) => {
  const dispatch = useDispatch();

  // Soportar dos posibles nombres en el estado: items || comments
  const commentState = useSelector((state) => state.comment || {});
  const comments = commentState.items || commentState.comments || [];

  useEffect(() => {
    if (postId) dispatch(getCommentsByPost(postId));
  }, [dispatch, postId]);

  if (!Array.isArray(comments) || comments.length === 0) {
    return <p style={{ marginTop: 8 }}>No hay comentarios todavía.</p>;
  }

  return (
    <div style={{ marginTop: 12 }}>
      {comments.map((c) => (
        <div
          key={c._id}
          style={{
            border: '1px solid #eee',
            borderRadius: 8,
            padding: 12,
            marginTop: 12,
          }}
        >
          {/* Pinta el texto del comentario (campo 'text' del backend) */}
          <p style={{ margin: 0 }}>{c.text}</p>

          {/* Si tu back guarda imagen en el comentario, se mostrará */}
          {c.image && (
            <img
              src={`http://localhost:3000/uploads/${c.image}`}
              alt=""
              style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 6, marginTop: 8 }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;
