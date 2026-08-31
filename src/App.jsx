import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import TripForm from "./Components/TripForm";
import TripDetails from "./Components/TripDetails";
import Login from "./auth/Login";
import Register from "./auth/Register";
import ChatRoom from "./ChatRoom";
import Explore from "./explore/explore";
import Location from "./explore/location";
import locationsRouter from "#api/locations";
import Place from "./explore/place";
import MyTrips from "./Components/MyTrips";
import ProtectedRoute from "./auth/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<p>Home page</p>} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/trips/:tripId/chat" element={<ChatRoom />} />

        <Route path="/trips/new" element={<TripForm />} />
        <Route
          path="/trips/:id"
          element={
            <ProtectedRoute>
              <TripDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trips"
          element={
            <ProtectedRoute>
              <MyTrips />
            </ProtectedRoute>
          }
        />

        <Route path="/explore" element={<Explore />} />
        <Route path="/explore/:id" element={<Location />} />
        <Route path="/explore/:id/activities" element={<Location />} />
        <Route path="/explore/:id/lodging" element={<Location />} />
        <Route path="/explore/:id/:placeId" element={<Place />} />
      </Route>
    </Routes>
  );
}
