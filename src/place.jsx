import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";

const BASE = "http://localhost:3000/explore";

export default function Place() {
  const { id } = useParams();
  const { placeId } = useParams();
  const [selectedPlace, setSelectedPlace] = useState(null);
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
  useEffect(() => {
    getPlaceDetails();
  }, []);
  //console.log("SELECTED PLACE", selectedPlace);
  if (!selectedPlace) {
    return <p>Loading...</p>;
  }
  const place = selectedPlace[0];
  //console.log("PLACE", place);
  return (
    <>
      <h1>{place.name}</h1>
      <p>{place.description}</p>
      <Link to={`/`}>Plan a Trip today!</Link>
      <button onClick={() => navigate(-1)}>Back to Search</button>
    </>
  );
}
