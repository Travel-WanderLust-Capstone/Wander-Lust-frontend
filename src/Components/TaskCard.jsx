function TaskCard({ task }) {
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

  return (
    <article>
      <h3>{task.title}</h3>

      <p>Assigned To: {task.assigned_to}</p>

      <p>Due: {task.due_date}</p>

      {/* Is task.completed true? YES → "Completed", NO → "Not Completed" */}
      <p>Status: {task.completed ? "Completed" : "Not Completed"}</p>

      {/* Is the due date between today and three days from today?
if yes, then task isnt completed */}

      {!task.completed && daysUntilDue < 0 && <p> ⚠️ Task Overdue!</p>}

      {!task.completed && daysUntilDue === 0 && <p> ⚠️ Task Due Today!</p>}

      {!task.completed && daysUntilDue <= 3 && daysUntilDue > 0 && (
        <p> ⚠️ This task is due soon!</p>
      )}
    </article>
  );
}

export default TaskCard;
