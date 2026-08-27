import TaskCard from "./TaskCard"; //importede from component i just created in TaskCard

function TaskList({ tasks, users }) {
  //component expects array of tasks

  return (
    //if there are 0 items in tasks array then display message
    <section>
      {/* <h2>Assign Tasks</h2> */}

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} users={users} />
      ))}
    </section>
  );
  //Go through every task in the array and create something for each one.
  //React creates a TaskCard for each object
  //tasks.map creates 3 different task cards
  //TaskCard passes current task into TaskCard
}

export default TaskList;
