import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(user?.avatar);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (user?._id) {
      axios
        .get(`http://localhost:3000/posts/user/${user._id}`)
        .then((res) => setUserPosts(res.data))
        .catch((err) => {
          console.error("Error cargando posts del usuario", err);
          setUserPosts([]);
        });
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(file.name);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:3000/users/avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = response.data.user;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      window.location.reload();
    } catch (error) {
      console.error("Error al subir imagen:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserPosts(userPosts.filter((p) => p._id !== postId));
    } catch (error) {
      console.error("Error al eliminar post:", error);
    }
  };

  return (
    <div className="profile-container">
      <img
        src={
          user?.avatar
            ? `http://localhost:3000/uploads/${user.avatar}`
            : "http://via.placeholder.com/120"
        }
        alt="Avatar"
        className="profile-image"
      />

      <div className="profile-info">
        <h2 className="profile-name">{user?.name}</h2>
        <p className="profile-email">{user?.email}</p>
      </div>

      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Cambiar foto</button>

      {/* ✅ Posts del usuario */}
      <div className="profile-posts">
        <h3>Mis publicaciones</h3>
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <div key={post._id} className="post-card">
              <p>{post.content}</p>
              {post.image && (
                <img
                  src={`http://localhost:3000/uploads/${post.image}`}
                  alt="post"
                />
              )}
              <div className="post-actions">
                <Link to={`/post/${post._id}`}>Ver detalles</Link>
                {user && user._id === post.author._id && (
                  <>
                    <Link to={`/edit-post/${post._id}`}>Editar</Link>
                    <button onClick={() => handleDeletePost(post._id)}>
                      Eliminar
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No has publicado nada aún.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;








