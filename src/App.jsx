import { Route, Routes, Link } from "react-router";
import TripForm from "./Components/TripForm";
import Login from "./auth/Login";
import Register from "./auth/Register";

export default function App() {
  return (
    //go back and insert classNames from CSS when created
    <main className="app">
      <header>
        <h1>Wanderlust Trip Planner</h1>
        <p>Start planning your next adventure.</p>

        <nav>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/trips/new">Create New Trip</Link>
        </nav>
      </header>

      <Routes>
        <Route index element={<p>Home page</p>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/trips/new" element={<TripForm />} />
      </Routes>
    </main>
  );
}
