import { useState, useEffect } from "react"; //component remember info
import { useNavigate } from "react-router";
import { createTrip } from "../api/trips";
import { getLocations } from "../api/locations";

function TripForm() {
  //TripForm loads

  console.log("TripForm is rendering!");

  //CREATE STATE
  //all of these are from createTrip query from backend
  //all of these useStates stores what user types.
  const [name, setName] = useState(""); // Ex: name = "Bachelorette"
  const [locationId, setLocationId] = useState(""); //
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate(); //lets javascript send user to another page

  //USE EFFECT
  //runs to load locations when page opens
  useEffect(() => {
    async function loadLocations() {
      const locationData = await getLocations();
      console.log("LocationData", locationData);
      setLocations(locationData);
    }
    loadLocations();
  }, []);

  //handleSubmit FUNCTION
  async function handleSubmit(event) {
    event.preventDefault(); //prevent default behavior(refreshing)

    //if any input field empty cant submit form
    if (
      !name.trim() ||
      !locationId.trim() ||
      !startDate.trim() ||
      !endDate.trim() ||
      !description.trim()
    ) {
      return;
    }
    const tripData = {
      name: name,
      location_id: Number(locationId),
      start_date: startDate,
      end_date: endDate,
      description: description,
    };

    console.log("Trip being created", tripData);

    const newTrip = await createTrip(tripData);
    //create new trip and save the trip returned by backend into newTrip
    console.log("Created Trip", newTrip);

    navigate(`/trips/${newTrip.id}`);
    //Go to the Trip Details page for the trip we just created
  }

  //Cancel trip button
  //each line resets state variables back to original value
  function handleCancel() {
    setName("");
    setLocationId("");
    setStartDate("");
    setEndDate("");
    setDescription("");
  }

  //Actual Form
  return (
    //come back and create the classNames CSS
    <form onSubmit={handleSubmit} className="trip-form">
      <h2>Create New Trip</h2>
      <label>
        Trip Name
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>

      <label>
        Location
        <select
          value={locationId}
          onChange={(event) => setLocationId(event.target.value)}
        >
          <option value="">Select a location</option>

          {/* go through every location in my locations array and create an option
          ?: only run map() if location exists */}
          {locations?.map((location) => (
            // user sees name and react stores Id
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Start Date
        <input
          type="date"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
        />
      </label>

      <label>
        End Date
        <input
          type="date"
          value={endDate}
          onChange={(event) => setEndDate(event.target.value)}
        />
      </label>

      <label>
        Description
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>

      <button type="submit">Create Trip</button>
      <button type="button" onClick={handleCancel}>
        Cancel Trip
      </button>
    </form>
  );
}
export default TripForm;
