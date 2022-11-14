import React from "react";
import useAuth from "../hook/useAuth";
import Navbar from "./Navbar";

function Layout({ children }) {
  const { logOut } = useAuth();
  return (
    <>
      <Navbar />
      <div className="main">
        <button className="logout" onClick={logOut}>
          logout
        </button>
        {children}
      </div>
    </>
  );
}

export default Layout;
