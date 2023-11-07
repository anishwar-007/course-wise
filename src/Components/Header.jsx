import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import firebase from "../firebase";
import "../styles/Header.css";
const Header = ({ signOut }) => {
  const [user, setUser] = useState();
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className="app-header">
      <h1 className="app-title">CourseWise</h1>
      <div className="header-actions">
        {user ? (
          <button onClick={signOut} className="sign-out-button">
            Sign Out
          </button>
        ) : (
          <Link to="/" className="sign-in-link">
            Sign In
          </Link>
        )}
        {user && (
          <Link to="/dashboard" className="dashboard-link">
            <FaUser />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
