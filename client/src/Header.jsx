import { useContext, useState, useTransition } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    })
      .then(response => {
        if (!response.ok) {
          setUserInfo(null);
          return;
        }
        return response.json();
      })
      .then(data => {
        if (data) {
          setUserInfo(data);
        }
      })
      .catch(err => {
        console.error("Error fetching profile:", err);
        setUserInfo(null);
      });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        My blog
      </Link>
      <nav>
        {username && (
          <>
            <span>Hello, {username}</span>
            <Link to={"/create"}>Create a Post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
