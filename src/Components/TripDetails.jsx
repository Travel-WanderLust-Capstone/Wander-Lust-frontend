import { useState, useEffect } from "react"; //component remember info
import { useParams } from "react-router";
import { getTripById, addUserToTrip } from "../api/trips";
// import { getUsers } from "../api/users";
import { getTasksByTripId, createTask, deleteTask } from "../api/tasks";
import TaskList from "./TaskList";

function TripDetails() {
  //Get the id out of the URL and store it in a variable called id
  const { id } = useParams();
  console.log(id);

  //STATE
  const [trip, setTrip] = useState(null); //store trip. returned by backend. null=haveent loaded trip yet
  const [tasks, setTasks] = useState([]); //stors task. starts as empty array bc no tasks loaded yet
  //   const [allUsers, setAllUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");

  //DATE FORMAT
  function formatDate(date) {
    if (!date) return ""; //check if there's a date
    //if not, return empty string

    const [year, month, day] = date.split("T")[0].split("-");
    //reference from ChatGpt to get specific setup for date
    //.split("T") says:"Cut this string wherever you see the letter T."
    //2026-08-27T05:00:00.000Z gets split into ["2026-08-27", "05:00:00.000Z"]
    //the [0] means give the first part
    //.split("-") means split year, month, and day and stores in the 3 above variables

    //rearrange the date
    return `${month}/${day}/${year}`;
  }

  console.log("trip.users", trip?.users);

  //USE EFFECT: when TripDetails opens, FETCH trip and its tasks
  //LOAD trip and taks when page opens
  useEffect(() => {
    async function loadTripDetails() {
      const tripData = await getTripById(id); //calls frontend API function

      const taskData = await getTasksByTripId(id);

      //   const userData = await getUsers();

      setTrip(tripData); //backend trip stored in "tripData" then "setTrip(tripiData)" ->
      //takes returned object and puts into trips into state

      setTasks(taskData || []);

      //   setAllUsers(userData || []);
    }

    loadTripDetails();
  }, [id]); //Run this effect when the component loads and again if tripId changes.

  console.log("Trip:", trip);
  console.group("Tasks:", tasks);
  console.log("Tasks from API:", tasks);

  //HANDLE event function for ADDING traveler
  async function handleAddTraveler(event) {
    event.preventDefault(); //prevent default behavior(refreshing)

    await addUserToTrip(id, userId, message); //sends POST request

    const updatedTrip = await getTripById(id); //fetched trip again so new traveler appears

    setTrip(updatedTrip);

    setUserId("");
    setMessage("");
  }

  //HANDLE ADD TASK
  async function handleCreateTask(event) {
    event.preventDefault();

    await createTask(id, taskTitle, dueDate, selectedUserId);

    // Fetch the tasks again so the new task appears
    const updatedTasks = await getTasksByTripId(id);

    setTasks(updatedTasks || []);

    // Clear the form
    setTaskTitle("");
    setDueDate("");
    setSelectedUserId("");
  }

  //HANDLE DELETE TASK
  async function handleDeleteTask(taskId) {
    await deleteTask(taskId);

    const updatedTasks = await getTasksByTripId(id);

    setTasks(updatedTasks || []);
  }

  //LOADING trip message
  //If there isn't a trip yet, show "Loading trip..." until api responds.
  if (!trip) {
    return <p className="loading-message">Loading Trip...</p>;
  }

  return (
    <main className="trip-details-page">
      <h1 className="trip-details-heading">Trip Details</h1>

      {/* TRIP INFORMATION */}
      <section className="trip-details-card">
        <h2>{trip.name}</h2>

        <p className="trip-info">
          <strong>Location:</strong> {trip.location}
        </p>

        <p className="trip-info">
          <strong>Start Date:</strong> {formatDate(trip.start_date)}
        </p>

        <p className="trip-info">
          <strong>End Date:</strong> {formatDate(trip.end_date)}
        </p>

        <p className="trip-info">{trip.description}</p>
      </section>

      {/* TRAVELERS  */}

      <section className="trip-section-card">
        <h2>Travelers</h2>

        <div className="traveler-list">
          {trip.users?.map((user) => (
            <p className="traveler-name" key={user.id}>
              {user.name}
            </p>
          ))}
        </div>
      </section>

      {/* ADD TRAVELER */}

      <section className="trip-section-card">
        <h2>Add Traveler</h2>

        <form className="trip-details-form" onSubmit={handleAddTraveler}>
          <label className="form-group">
            Traveler
            <select
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
            >
              <option value="">Select a traveler</option>
              <option value="1">Kylan Gentry</option>
              <option value="2">Amelie Griffith</option>
              <option value="3">Lucien Lee</option>
            </select>
          </label>

          {/* <label>
            Message:
            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </label> */}

          <button type="submit">Add Traveler</button>
        </form>
      </section>

      {/* ASSIGN TASK */}

      <section className="trip-section-card">
        <h2>Assign Task</h2>

        <form className="trip-details-form" onSubmit={handleCreateTask}>
          <label className="form-group">
            Task:
            <input
              type="text"
              value={taskTitle}
              onChange={(event) => setTaskTitle(event.target.value)}
            />
          </label>

          <label className="form-group">
            Due Date:
            <input
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
            />
          </label>

          <label className="form-group">
            Assign To:
            <select
              value={selectedUserId}
              onChange={(event) => setSelectedUserId(event.target.value)}
            >
              <option value="">Select Traveler</option>

              {trip.users?.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          <button type="submit">Create Task</button>
        </form>
      </section>

      {/* TASK LIST */}

      <section className="task-section">
        <h2>Tasks</h2>
        <TaskList
          tasks={tasks}
          users={trip.users || []}
          onDeleteTask={handleDeleteTask}
        />
        {/* tasks is prop name. {tasks} is state from details page.
      TaskList is array of tasks fetched */}
      </section>
    </main>
  );
}

export default TripDetails;
