import { Link } from "react-router-dom";

const Banned = () => {
  return (
    <section className="banned__section">
      <h1 className="banned__header">Banned Page</h1>
      <br />
      <p className="admin__paragraph">You must have been assigned an Banned role.</p>
      <div className="flexGrow">
        <Link to="/" style={{ color: "gray" }}>Home</Link>
      </div>
    </section>
  );
};

export default Banned;
