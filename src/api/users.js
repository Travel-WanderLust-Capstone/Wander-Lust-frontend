const BASE_URL = "http://localhost:3000";

export async function getUsers() {
  try {
    const response = await fetch(`${BASE_URL}/users`);

    const users = await response.json();

    return users;
  } catch (error) {
    console.error("There was an error getting users.", error);
  }
}
