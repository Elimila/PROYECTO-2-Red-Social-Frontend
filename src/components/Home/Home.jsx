import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllPosts } from "../../redux/post/postService";
import Posts from "../Posts/Posts"; // ✅ Importamos el nuevo componente

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error al cargar los posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>Bienvenida, {user?.name} 👋</h2>
      <p>Este será tu muro de publicaciones.</p>

      <h3>📝 Publicaciones recientes:</h3>
      <Posts posts={posts} /> {/* ✅ Mostramos los posts con el nuevo componente */}
    </div>
  );
};

export default Home;

