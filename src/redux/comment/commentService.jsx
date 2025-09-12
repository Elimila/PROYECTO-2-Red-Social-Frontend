import axios from 'axios';

const API_URL = 'http://localhost:3000/comments';

const createComment = async (postId, formData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };
  const res = await axios.post(`${API_URL}/${postId}`, formData, config);
  return res.data;
};

// ✅ AÑADE ESTA FUNCIÓN AL SERVICIO
const getCommentsByPost = async (postId) => {
  const res = await axios.get(`${API_URL}/post/${postId}`);
  return res.data;
};

const commentService = {
  createComment,
  getCommentsByPost, // ✅ EXPORTA LA NUEVA FUNCIÓN
};

export default commentService;
