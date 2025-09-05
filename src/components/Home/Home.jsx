import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h2>Bienvenida, {user?.name} 👋</h2>
      <p>Este será tu muro de publicaciones.</p>
    </div>
  );
};

export default Home;
