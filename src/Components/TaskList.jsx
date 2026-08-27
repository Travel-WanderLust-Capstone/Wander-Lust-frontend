import TaskCard from "./TaskCard"; //importede from component i just created in TaskCard

//TaskList loops through tasks
function TaskList({ tasks, users, onDeleteTask }) {
  //component expects array of tasks

  //Are there zero tasks? If yes, then return message
  if (tasks.length === 0) {
    //if there are 0 items in tasks array then display message
    return <p className="loading-message">No tasks assigned</p>;
  }
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          users={users}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
  //Go through every task in the array and create something for each one.
  //React creates a TaskCard for each object
  //tasks.map creates 3 different task cards
  //TaskCard passes current task into TaskCard
}

export default TaskList;
