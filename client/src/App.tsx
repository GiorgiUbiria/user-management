import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Personal from "./pages/Personal";
import Missing from "./pages/Missing";
import Users from "./pages/Users";
import Layout from "./pages/Layout";
import LinkPage from "./pages/LinkPage";
import Lounge from "./pages/Lounge";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Unauthorized from "./pages/Unauthorized";
import Banned from "./pages/Banned";

const ROLES = {
  Admin: "Admin",
  Standard: "Standard",
  Banned: "Banned",
};

function App() {
  /* 
    1. Style Home Page and Navigation Page
    2. Add Personal Page for Users
    3. Add Photo Upload Functionality for Users
  */

  return (
    <>
      <Navigation></Navigation>

      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="linkpage" element={<LinkPage />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* we want to protect these routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.Standard]} />}>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<Users />} />
              <Route path="edituser/:id" element={<Personal />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Banned]} />}>
              <Route path="banned" element={<Banned />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="admin" element={<Admin />} />
            </Route>

            <Route
              element={
                <RequireAuth allowedRoles={[ROLES.Banned, ROLES.Admin]} />
              }
            >
              <Route path="lounge" element={<Lounge />} />
            </Route>
          </Route>

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>

      <Footer></Footer>
    </>
  );
}

export default App;

/* Backend API does work. Frontend Register and Login Forms Work too. Need to Protect Routes, Implement Refresh Token, Persistent Login */
