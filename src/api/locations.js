const BASE_URL = import.meta.env.VITE_API_URL;
console.log("BASE URL:", BASE_URL);

export async function getLocations() {
  try {
    const response = await fetch(`${BASE_URL}/location`);

    if (!response.ok) {
      throw new Error("Failed to fetch locations");
    }

    const result = await response.json();

    console.log(result);
    return result;
  } catch (error) {
    console.error("There was an error getting locations", error);
  }
}
