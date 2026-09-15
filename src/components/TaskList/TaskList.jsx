import TaskItem from '../TaskItem/TaskItem';

function TaskList({ tasks }) {
  if (tasks.length === 0) {
    return <p>No tasks found.</p>;
  }

  return (
    <section>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
        />
      ))}
    </section>
  )
}

export default TaskList;