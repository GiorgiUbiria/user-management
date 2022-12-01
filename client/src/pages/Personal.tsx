import { useNavigate, useLocation } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Personal = () => {
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const id = location.pathname.split("/")[2];

  const userRef = useRef() as any;
  const errRef = useRef() as any;

  const [username, setUsername] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username]);

  const handleEditUser = async (e: any) => {
    e.preventDefault();
    console.log(id);

    try {
      const response = await axiosPrivate.patch(
        `edituser/${id}`,
        JSON.stringify({ username }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setUsername("");
      navigate("/users");
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.message);
      }
      errRef.current.focus();
    }
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Edit User</h1>
      <form onSubmit={handleEditUser}>
        <label className="label" htmlFor="username">
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="email"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />
        <button className="sign__in">Edit</button>
      </form>
    </section>
  );
};

export default Personal;
