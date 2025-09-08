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

const commentService = {
  createComment,
};

export default commentService;
