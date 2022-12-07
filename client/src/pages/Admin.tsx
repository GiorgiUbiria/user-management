import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section className="admin__section">
      <h1 className="admin__header">Admins Page</h1>
      <br />
      <p className="admin__paragraph">You must have been assigned an Admin role.</p>
      <div className="flexGrow">
        <Link to="/" style={{ color: "gray" }}>Home</Link>
      </div>
    </section>
  );
};

export default Admin;
