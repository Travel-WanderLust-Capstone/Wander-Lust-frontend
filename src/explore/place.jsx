import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";

const BASE = import.meta.env.VITE_API_URL;

export default function Place() {
  const { id, placeId } = useParams();
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();

  async function getPlaceDetails() {
    try {
      const response = await fetch(`${BASE}/explore/${id}/${placeId}`);
      const result = await response.json();
      console.log("PLACE RESULT:", result);
      setSelectedPlace(result);
    } catch (e) {
      console.error(e);
    }
  }

  async function getLocationDetails() {
    try {
      const response = await fetch(`${BASE}/explore/${id}`);
      const result = await response.json();
      setLocation(result.location[0]);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getPlaceDetails();
    getLocationDetails();
  }, [id, placeId]);

  if (!selectedPlace || !location) {
    return <p>Loading...</p>;
  }
  const place = selectedPlace[0];
console.log("PLACE ID:", placeId);
console.log("PLACE FETCH:", `${BASE}/explore/${id}/${placeId}`);
  console.log("LOCATION FETCH:", `${BASE}/explore/${id}`);
  return (
    <>
      <div className="location-layout">
        <div className="description-card">
          <h1>{place.name}</h1>
          <p>{place.description}</p>
          <Link to={`/trips/:id`}>Look interesting? Add this to a trip!</Link>
          <button onClick={() => navigate(-1)}>Back to Search</button>
        </div>
        <img
          className="location-img"
          src={location.image_url}
          alt={location.name}
        />
      </div>
    </>
  );
}
