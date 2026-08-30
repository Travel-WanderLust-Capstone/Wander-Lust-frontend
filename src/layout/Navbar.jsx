import { NavLink } from "react-router";

import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();
  return (
    <header id="navbar">
      <NavLink id="brand" to="/">
        <h1>Wander Lust</h1>
      </NavLink>
      <nav>
        {token ? (
          <button onClick={logout}>Log out</button>
        ) : (
          <NavLink to="/login">Log in</NavLink>
        )}
      </nav>
      <NavLink to="/explore">Explore</NavLink>
      <NavLink to="/trips/new">Plan a New Trip Today!</NavLink>
      <NavLink to="/trips/:id">Your Trips</NavLink>
    </header>
  );
}
