import { Route, Routes, Link } from "react-router";
import TripForm from "./Components/TripForm";
import TripDetails from "./Components/TripDetails";
import Login from "./auth/Login";
import Register from "./auth/Register";
import "./app.css";
import Explore from "./explore/explore";
import Location from "./explore/location";
import Place from "./explore/place";

export default function App() {
  return (
    //go back and insert classNames from CSS when created
    <main className="app">
      <header>
        <h1>Wanderlust Trip Planner</h1>

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
        <Route path="/trips/:id" element={<TripDetails />} />

        <Route path="/explore" element={<Explore />} />
        <Route path="/explore/:id" element={<Location />} />
        <Route path="/explore/:id/activities" element={<Location />} />
        <Route path="/explore/:id/lodging" element={<Location />} />
        <Route path="/explore/:id/:placeId" element={<Place />} />
      </Routes>
    </main>
  );
}

//   return (
//     <Routes>
//       <Route element={<Layout />}>
//         <Route index element={<p>Home page</p>} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/tripform" element={<TripForm />} />
//       </Route>
//     </Routes>
//   );
// }
