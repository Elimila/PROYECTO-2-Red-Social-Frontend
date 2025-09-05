const Posts = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <p>Aún no hay publicaciones.</p>;
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post._id} style={{ borderBottom: "1px solid #ccc", marginBottom: "1rem" }}>
          <h4>{post.title}</h4>
          <p><strong>Autor:</strong> {post.author?.name}</p>
          <p>{post.content.slice(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
};

export default Posts;
