import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [userName, setUsername] = useState(null);
  useEffect(() => {
    try {
      fetch("http://localhost:4000/profile", {
        credentials: "include",
      }).then(response => {
        console.log(response)
        if(!response.ok) return;
        response.json().then(userInfo => {
          setUsername(userInfo.username);
        });
      });
    } catch (err){
      if(err);
    }
  }, []);
  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUsername(null);
  }
  return (
    <header>
      <Link to="/" className="logo">
        My blog
      </Link>
      <nav>
        {userName && (
          <>
            <Link to={"/create"}>
              Create new post <b>{userName}</b>
            </Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!userName && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
