import { useState, useEffect } from "react";
import { Link } from "react-router";
const API = import.meta.env.VITE_API_URL;

export default function Explore() {
  const [locations, setLocations] = useState([]);
  async function getLocations() {
    try {
      const response = await fetch(`${API}/explore`);

      console.log("API URL:", API);
console.log("STATUS:", response.status);
console.log("RESPONSE URL:", response.url);

      if (!response.ok) {
  throw new Error(`Failed to get locations: ${response.status}`);
}
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
      <div className="location-card">
        <h1>Explore!</h1>
        <p>satisfy your wanderlust today!</p>
      </div>
      {locations.map((location) => (
        <div key={location.id} className="location-card">
          <Link to={`/explore/${location.id}`} >
            {location.name}
          </Link>
        </div>
      ))}
    </>
  );
}
