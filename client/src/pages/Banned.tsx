import { Link } from "react-router-dom";

const Banned = () => {
  return (
    <section>
      <h1>Banned Page</h1>
      <br />
      <p>You must have been assigned an Banned role.</p>
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};

export default Banned;
