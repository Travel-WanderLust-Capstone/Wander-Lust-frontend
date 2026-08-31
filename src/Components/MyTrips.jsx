import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getMyTrips } from "../api/trips";
import { useAuth } from "../auth/AuthContext";

function MyTrips() {
  const [trips, setTrips] = useState([]);

  const { token } = useAuth();

  useEffect(() => {
    async function loadMyTrips() {
      //asks the backend for the currently logged-in user's trips.
      const tripData = await getMyTrips(token);

      setTrips(tripData); //stores all trips
    }

    loadMyTrips();
  }, [token]);

  //format date
  function formatDate(date) {
    if (!date) return "";

    const [year, month, day] = date.split("T")[0].split("-");

    return `${month}/${day}/${year}`;
  }

  return (
    <main className="my-trips-page">
      <h1>Your Trips</h1>

      {trips.length === 0 ? (
        <p>You do not have any trips yet.</p>
      ) : (
        <div className="trip-card-container">
          {trips.map(
            (
              trip, //For every trip this user has, create one trip card.
            ) => (
              <article className="trip-card" key={trip.id}>
                <h2>{trip.name}</h2>

                <p>
                  <strong>Start Date:</strong> {formatDate(trip.start_date)}
                </p>

                <p>
                  <strong>End Date:</strong> {formatDate(trip.end_date)}
                </p>

                <p>{trip.description}</p>

                {/* Make each card lead to the correct Trip Details page. */}
                <Link to={`/trips/${trip.id}`}>View Trip Details</Link>
              </article>
            ),
          )}
        </div>
      )}
    </main>
  );
}

export default MyTrips;
