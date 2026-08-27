const BASE_URL = "http://localhost:3000";

export async function createTask(tripId, title, dueDate, userId) {
  const response = await fetch(`${BASE_URL}/trips/${tripId}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      dueDate,
      userId,
    }),
  });

  const result = await response.json();

  return result;
}

export async function getTasksByTripId(tripId) {
  try {
    const response = await fetch(`${BASE_URL}/trips/${tripId}/tasks`);

    const tasks = await response.json();

    console.log("Tasks API", tasks);

    return tasks;
  } catch (error) {
    console.error("There was an error getting tasks.", error);
  }
}

export async function assignTaskToUser(taskId, userId) {
  const response = await fetch(
    `${BASE_URL}/tasks/${taskId}/assign`,

    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    },
  );

  const result = await response.json();
  return result;
}
