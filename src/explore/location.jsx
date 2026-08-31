import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";

const BASE = "https://wander-lust-oexs.onrender.com";

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
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    getLocationDetails();
  }, []);
  if (!selectedLocation) {
    return <p>Loading...</p>;
  }
  const location = selectedLocation.location[0];

  const filteredPlaces =
    filter === "all"
      ? selectedLocation.places
      : selectedLocation.places.filter((place) => place.type === filter);

  return (
    <>
      <div className="location-layout">
        <div className="location-content">
          <div className="description-card">
            <h1>{location.name} ~</h1>
            <p>{location.description}</p>
            <button onClick={() => navigate(-1)}>Back to Explore</button>
            <Link to={`/trips/new`}>Plan a Trip today!</Link>
          </div>
          <div className="title-card">
            <h2>~ Attractions ~</h2>
          </div>
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
