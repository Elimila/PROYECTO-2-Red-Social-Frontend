import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../redux/post/postSlice";
import Post from "../Posts/Post";

const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <div className="home-container">
      <section className="posts-container">
        <h2>Últimas publicaciones</h2>
        {posts && posts.length > 0 ? (
          posts.map((post) => <Post key={post._id} post={post} />)
        ) : (
          <p>No hay publicaciones todavía.</p>
        )}
      </section>
    </div>
  );
};

export default Home;

