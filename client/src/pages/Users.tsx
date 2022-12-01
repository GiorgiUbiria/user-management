import Logo from "/user.png";
import "../components/css/Users.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useLogout from "../hooks/useLogout";

const Users = () => {
  const [users, setUsers] = useState() as any;
  const axiosPrivate = useAxiosPrivate();
  const signOut = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (error: any) {
        console.error(error);
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  let i = 1;

  const handleDelete = async (id: any) => {
    const response: any = await axiosPrivate.delete(`/deleteuser/${id}`);

    await signOut();

    setUsers(
      users.filter((user: any) => {
        user._id !== id;
      })
    );
  };

  const handleEdit = async (id: any) => {
    navigate(`/edituser/${id}`);
  };

  return (
    <>
      <div className="flex">
        {users?.length ? (
          <>
            {users.map((user: any) => (
              <div className="container">
                <div className="card">
                  <div className="imgBx">
                    <img src={Logo}></img>
                  </div>
                  <div className="contentBx">
                    <h2>{user.username}</h2>
                    <div className="size" key={i}>
                      <span>{i++}</span>
                    </div>
                    <a onClick={() => handleDelete(user._id)}>Delete</a>
                    <a onClick={() => handleEdit(user._id)}>Edit</a>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p>No users to display</p>
        )}
      </div>
    </>
  );
};

export default Users;
