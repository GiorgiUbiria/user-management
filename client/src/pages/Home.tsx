import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Home = () => {
  const logout = useLogout();
  const navigate = useNavigate();

  const signOut = async () => {
    await logout();
    navigate("/linkpage");
  };

  return (
    <section className="home__section">
      <h1 className="home__header">Home</h1>
      <br />
      <p className="home__paragraph">You are logged in!</p>
      <br />
      <div className="links">
        <Link to="/banned">Go to the Banned page</Link>
        <br />
        <Link to="/admin">Go to the Admin page</Link>
        <br />
        <Link to="/users">Go to the Users page</Link>
        <br />
        <Link to="/linkpage">Go to the link page</Link>
      </div>
      <div className="flexGrow">
        <button onClick={signOut}>Sign Out</button>
      </div>
    </section>
  );
};

export default Home;
