import { Route, Routes } from "react-router";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Explore from "./explore/explore";
import Location from "./explore/location";
import Place from "./explore/place";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<p>Home page</p>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/explore/:id" element={<Location />} />
        <Route path="/explore/:id/activities" element={<Location />} />
        <Route path="/explore/:id/lodging" element={<Location />} />
        <Route path="/explore/:id/:placeId" element={<Place />} />
      </Route>
    </Routes>
  );
}
