//TaskCard displays ONE task
function TaskCard({ task, onDeleteTask }) {
  //component expects task object

  //needed code and meanings from chat for setting alert
  //Get today's date
  const today = new Date();

  // Ignore the current time
  today.setHours(0, 0, 0, 0); //This line helps you do: ignore the current time and compare calendar dates.

  // Get the task's due date
  //turns task due date into javascript date
  const dueDate = new Date(task.due_date);

  //ignore the time
  dueDate.setHours(0, 0, 0, 0);

  //get the difference between dates
  const difference = dueDate - today;

  // Get days til due. Convert difference into days
  const daysUntilDue = Math.ceil(difference / (1000 * 60 * 60 * 24));

  //DATE FORMAT
  function formatDate(date) {
    if (!date) return ""; //check if there's a date
    //if not, return empty string

    const [year, month, day] = date.split("T")[0].split("-");
    //.split("T") says:"Cut this string wherever you see the letter T."
    //2026-08-27T05:00:00.000Z gets split into ["2026-08-27", "05:00:00.000Z"]
    //the [0] means give the first part
    //.split("-") means split year, month, and day and stores in the 3 above variables

    //rearrange the date
    return `${month}/${day}/${year}`;
  }

  return (
    <article className="task-card">
      <h3>{task.title}</h3>

      <p>
        Assigned To:
        {task.assigned_to}
      </p>

      <p>Due: {formatDate(task.due_date)}</p>

      {/* Is task.completed true? YES → "Completed", NO → "Not Completed" */}
      <p>Status: {task.completed ? "Completed" : "Not Completed"}</p>

      {/* Is the due date between today and three days from today?
if yes, then task isnt completed */}

      {!task.completed && daysUntilDue < 0 && <p> ⚠️ Task Overdue!</p>}

      {!task.completed && daysUntilDue === 0 && <p> ⚠️ Task Due Today!</p>}

      {!task.completed && daysUntilDue <= 3 && daysUntilDue > 0 && (
        <p className="task-warning"> ⚠️ This task is due soon!</p>
      )}

      <button type="button" onClick={() => onDeleteTask(task.id)}>
        Delete Task
      </button>
    </article>
  );
}

export default TaskCard;
