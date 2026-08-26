import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";

const BASE = "http://localhost:3000/explore";

export default function Place() {
  const { id } = useParams();
  const { placeId } = useParams();
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [location, setLocation] = useState(null);
  const navigate = useNavigate();

  async function getPlaceDetails() {
    try {
      const response = await fetch(`${BASE}/${id}/${placeId}`);
      const result = await response.json();
      setSelectedPlace(result);
      //console.log("RESULT", result);
    } catch (e) {
      console.error(e);
    }
  }

  async function getLocationDetails() {
    try {
      const response = await fetch(`${BASE}/${id}`);
      const result = await response.json();
      setLocation(result.location[0]);
      //console.log("RESULT", result);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getPlaceDetails();
    getLocationDetails();
  }, [id, placeId]);
  //console.log("SELECTED PLACE", selectedPlace);
  if (!selectedPlace || !location) {
    return <p>Loading...</p>;
  }
  const place = selectedPlace[0];
  //console.log("PLACE", place);
  return (
    <>
      <div className="location-layout">
        <div className="description-card">
          <h1>{place.name}</h1>
          <p>{place.description}</p>
          <Link to={`/`}>Look interesting? Add this to a trip!</Link>
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
