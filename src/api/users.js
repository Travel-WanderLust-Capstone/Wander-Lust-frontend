const BASE_URL = import.meta.env.VITE_API_URL;

export async function getUsers() {
  try {
    const response = await fetch(`${BASE_URL}/users`);

    const users = await response.json();

    return users;
  } catch (error) {
    console.error("There was an error getting users.", error);
  }
}
export async function loginUser(email, password) {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const result = await response.text();
  if (!response.ok) {
    throw new Error(result);
  }
  return result;
}
export async function registerUser(name, email, password) {
  const response = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  const result = await response.text();
  if (!response.ok) {
    throw new Error(result);
  }
  return result;
}
