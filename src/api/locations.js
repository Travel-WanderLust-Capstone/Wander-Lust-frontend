const BASE_URL = "http://localhost:3000";
const API_URL = `${BASE_URL}/locations`;

export async function getLocations() {
  try {
    const response = await fetch(API_URL);

    if (!response) {
      throw new Error("Failed to fetch locations");
    }

    const result = await response.json();

    console.log(result);
    return result;
  } catch (error) {
    console.error("There was an error getting locations", error);
  }
}
