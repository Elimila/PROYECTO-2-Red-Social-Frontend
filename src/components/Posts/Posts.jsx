import Post from "./Post";

const Posts = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <p>Aún no hay publicaciones.</p>;
  }

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;



