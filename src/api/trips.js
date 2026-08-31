const BASE_URL = import.meta.env.VITE_API;
const API_URL = `${BASE_URL}/trips`;

//async tells JavaaScript function will perform something that takes time
//try/catch: try running this but something may error
export async function getTrips() {
  try {
    //sends request
    //await: wait until request gets response before moving on
    //fetch: send a request to my API. ex: fetching ("http://localhost:3000/api/trips")
    const response = await fetch(API_URL);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("There was an error getting trips", error);
  }
}

//GET MY TRIPS
export async function getMyTrips(token) {
  try {
    const response = await fetch(`${API_URL}/mine`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.text();

      throw new Error(error);
    }

    const trips = await response.json();

    return trips;
  } catch (error) {
    console.error("There was an error getting your trips.", error);

    throw error;
  }
}

//pass the token
export async function createTrip(tripData, token) {
  //tripData is info we give function
  //object containing the information needed to create the trip

  //***come back and add TOKEN
  try {
    //Overall line 30-40: "Send a POST request to my trips API containing my new trip
    // information as JSON, and wait for the backend to respond."
    const response = await fetch(API_URL, {
      method: "POST", //create something new
      headers: {
        //extra information about your request.
        //tell your backend what type of data you're sending.
        //tells backend sending JSON
        //trip starts as javascript object. API request sends it as JSON.
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      //put trip info in request
      body: JSON.stringify(tripData),
    }); //body is the actual information you're sending to the backend.
    //fetch cant send normal javascript obj as json
    //json.stringify converts javascript into json string

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    //convert backend response
    const result = await response.json();

    return result; //createTrip gives newly created trip info back to who called function
  } catch (error) {
    console.error("There was an error creating trip.", error);
  } //if something goes wrong while creating trip throw error
}

//TRIP DETAILS
//gets token from authentication and calls
export async function getTripById(id, token) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    const trip = await response.json();

    return trip;
  } catch (error) {
    console.error("There was an error getting your trip.", error);

    throw error;
  }
}

//ADD user to TRIP
//next call it in TripDetails
export async function addUserToTrip(tripId, userId, message, token) {
  try {
    const response = await fetch(`${BASE_URL}/trips/${tripId}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId,
        message,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("There was an error adding traveler", error);

    throw error;
  }
}
