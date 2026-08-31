//let REACT frontend talk to backend routes

const BASE_URL = import.meta.env.VITE_API; //address where backend server is running

//send request to backend to create new task
//async: waiting for backend server to respond
export async function createTask(tripId, title, dueDate, userId, token) {
  //fetch(): send http request. contact backend.
  const response = await fetch(`${BASE_URL}/trips/${tripId}/tasks`, {
    //await: wait for backend to respond before continue

    //tell FETCH this is a POST request (create)
    method: "POST",
    headers: {
      //give server additional info about request
      "Content-Type": "application/json", //tells backend: data im sending is JSON
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      //contains actual task info that youre sending back
      title,
      dueDate,
      userId,
    }),
  });

  const result = await response.json(); //converts backend response into javascript

  return result;
}

//GET ALL TASKS belonging to one trip
//pass token
export async function getTasksByTripId(tripId, token) {
  try {
    //contacts backend
    const response = await fetch(`${BASE_URL}/trips/${tripId}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    //convert response to javascript
    const tasks = await response.json();

    console.log("Tasks API", tasks);

    return tasks; //send tasks back to REACT component
  } catch (error) {
    console.error("There was an error getting tasks.", error);
  }
}

//ASSIGNING TASK
export async function assignTaskToUser(taskId, userId) {
  //send request to backend and wait for response
  const response = await fetch(
    `${BASE_URL}/tasks/${taskId}/assign`,

    {
      method: "PATCH", //update
      headers: {
        "Content-Type": "application/json", //info in request body is JSON
      },
      body: JSON.stringify({
        userId, //sending "userId" to backend.
        //backend reads it using "const {userId} = request.body"
      }),
    },
  );

  const result = await response.json(); //backend sends updated task to back end
  //converts it from JSON to javascript
  return result;
}

//DELETE TASK
//SEND DELETE request. delete one task

export async function deleteTask(taskId) {
  const response = await fetch(`${BASE_URL}/trips/tasks/${taskId}`, {
    method: "DELETE", //tells backend delete. makes Express user "router.delete"
  });

  //if server did NOT return successful repsonse
  if (!response.ok) {
    throw new Error("Failed to delete task.");
  } //throw new error creates error on purpose. stop here. delete did not work.

  return await response.json(); //converts task from JSON to javascript then returns it
}
