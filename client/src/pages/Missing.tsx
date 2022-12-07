import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <article style={{ padding: "10rem" }}>
      <h1 className="missing__header">Oops!</h1>
      <p className="missing__paragraph">Page Not Found</p>
      <div className="flexGrow">
        <Link to="/" style={{ color: "gray" }}>Visit Our Homepage</Link>
      </div>
    </article>
  );
};

export default Missing;
