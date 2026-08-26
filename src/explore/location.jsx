import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";

const BASE = "http://localhost:3000/explore";

export default function Location() {
  const { id } = useParams();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  async function getLocationDetails() {
    try {
      const response = await fetch(`${BASE}/${id}`);
      const result = await response.json();
      setSelectedLocation(result);
      //console.log("RESULT", result);
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    getLocationDetails();
  }, []);
  //console.log("SELECTED LOCATION", selectedLocation);
  if (!selectedLocation) {
    return <p>Loading...</p>;
  }
  //console.log("PLACES:", selectedLocation.places);
  const location = selectedLocation.location[0];

  const filteredPlaces =
    filter === "all"
      ? selectedLocation.places
      : selectedLocation.places.filter((place) => place.type === filter);

  //console.log("FILTERED PLACES", filteredPlaces);
  return (
    <>
      <div className="location-layout">
        <div className="location-content">
          <div className="description-card">
            <h1>{location.name}</h1>
            <p>{location.description}</p>
            <button onClick={() => navigate(-1)}>Back to Explore</button>
            <Link to={`/`}>Plan a Trip today!</Link>
          </div>
          <h2>Attractions</h2>
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="activity">Activities</option>
            <option value="lodging">Lodging</option>
          </select>
          {filteredPlaces.map((place) => (
            <div key={place.id} className="place-card">
              <Link to={`/explore/${location.id}/${place.id}`}>
                {place.name}
              </Link>
            </div>
          ))}
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
