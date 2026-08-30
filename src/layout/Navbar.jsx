import { NavLink } from "react-router";
import { useAuth } from "../auth/AuthContext";

const TEAL = "rgb(38, 155, 155)";

export default function Navbar() {
  const { token, logout } = useAuth();

  const btnStyle = {
    backgroundColor: "white",
    color: TEAL,
    fontWeight: 600,
    padding: "0.4rem 0.9rem",
    borderRadius: 5,
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    fontSize: "0.95rem",
  };

  return (
    <header
      id="navbar"
      style={{
        backgroundColor: TEAL,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0.75rem 1.5rem",
      }}
    >
      <NavLink id="brand" to="/" style={{ textDecoration: "none" }}>
        <span style={{ color: "white", fontWeight: 700, fontSize: "1.25rem" }}>
          WanderLust ✈️
        </span>
      </NavLink>
      <nav>
        {token ? (
          <button onClick={logout} style={btnStyle}>Log out</button>
        ) : (
          <NavLink to="/login" style={btnStyle}>Log in</NavLink>
        )}
      </nav>
    </header>
  );
}