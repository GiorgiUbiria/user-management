import { Link } from "react-router-dom";

const LinkPage = () => {
  return (
    <section className="link__section">
      <h1 className="link__header">Links</h1>
      <br />
      <h2 className="link__header2">Public</h2>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <br />
      <h2 className="link__header2">Private</h2>
      <Link to="/">Home</Link>
      <Link to="/banned">Banned Page</Link>
      <Link to="/admin">Admin Page</Link>
    </section>
  );
};

export default LinkPage;
