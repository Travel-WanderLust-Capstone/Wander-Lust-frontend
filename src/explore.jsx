import { useState, useEffect } from "react";
import { Link } from "react-router";
const API = "http://localhost:3000/explore/";

export default function Explore() {
  const [locations, setLocations] = useState([]);
  async function getLocations() {
    try {
      const response = await fetch(API);
      const result = await response.json();
      setLocations(result);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getLocations();
  }, []);
  console.log("LOCATIONS", locations);

  return (
    <>
      <h1>Explore!</h1>
      <p>satisfy your wanderlust today!</p>
      {locations.map((location) => (
        <div key={location.id} className="location-card">
          <Link to={`/explore/${location.id}`} key={location.id}>
            {location.name}
          </Link>
        </div>
      ))}
    </>
  );
}
