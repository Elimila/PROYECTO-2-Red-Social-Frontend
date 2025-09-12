import axios from 'axios'

const API_URL = 'http://localhost:3000/posts'

// Obtener todos los posts
export const getAllPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const res = await axios.get(API_URL, config)
  return res.data
}

// Lógica para dar/quitar like
export const toggleLikePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const res = await axios.put(`${API_URL}/like/${postId}`, {}, config)
  return res.data
}

// Eliminar un post
export const deletePost = async (postId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const res = await axios.delete(`${API_URL}/${postId}`, config)
  return res.data
}

// Crear un post
export const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  }
  const res = await axios.post(API_URL, postData, config)
  return res.data
}

const postService = {
  getAllPosts,
  toggleLikePost,
  deletePost,
  createPost,
}

export default postService
