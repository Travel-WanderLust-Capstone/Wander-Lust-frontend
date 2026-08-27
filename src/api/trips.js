const BASE_URL = "http://localhost:3000";
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

export async function createTrip(tripData) {
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
        "Content-Type": "application/json",
      }, //tells backend sending JSON
      //trip starts as javascript object. API request sends it as JSON.

      //put trip info in request
      body: JSON.stringify(tripData),
    }); //body is the actual information you're sending to the backend.
    //fetch cant send normal javascript obj as json
    //json.stringify converts javascript into json string

    //convert backend response
    const result = await response.json();

    return result; //createTrip gives newly created trip info back to who called function
  } catch (error) {
    console.error("There was an error creating trip.", error);
  } //if something goes wrong while creating trip throw error
}

export async function getTripById(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    const trip = await response.json(); //backend json response to javascripit

    return trip;
  } catch (error) {
    console.error("There was an error getting your trip.", error);
  }
}

//ADD user to TRIP
//next call it in TripDetails
export async function addUserToTrip(tripId, userId, message) {
  try {
    const response = await fetch(`${BASE_URL}/trips/${tripId}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        message,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("There was an error adding traveler", error);
  }
}
