import { useNavigate, useLocation, Link } from "react-router-dom";
import { useRef, useState, useEffect, ReactElement } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Personal = () => {
  const [username, setUsername] = useState() as any;
  const [email, setEmail] = useState() as any;

  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();

  const id = location.pathname.split("/")[2];

  useEffect(() => {
    const getUser = async () => {
      const response = await axiosPrivate.get(`users/${id}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      console.log(response);
      setUsername(response.data.username);
      setEmail(response.data.email);
    };

    getUser();
  }, []);

  const changePasswordPage = async () => {
    navigate(`/change__password/${id}`);
  };

  return (
    <>
      (
      <section className="personal__section">
        <h1 className="personal__header"> Welcome {username} </h1>
        <div className="personal__info">
          <h3> Your Email: </h3>
          <p> {email} </p>

          <button className="change__password" onClick={changePasswordPage}>
            {" "}
            Change Password{" "}
          </button>
        </div>
      </section>
      );
    </>
  );
};

export default Personal;
