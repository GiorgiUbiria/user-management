import React from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";

import Register from "./pages/Register";
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import Personal from "./pages/Personal";
import Missing from "./pages/Missing";
import Users from "./pages/Users";
import Layout from "./pages/Layout";
import LinkPage from "./pages/LinkPage";
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
              <Route path="/users/:id" element={<Personal />} />
              <Route
                path="/change__password/:id"
                element={<ChangePassword />}
              />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Standard]} />}>
              <Route path="banned" element={<Banned />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Standard]} />}>
              <Route path="admin" element={<Admin />} />
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
