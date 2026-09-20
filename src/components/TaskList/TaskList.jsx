import TaskItem from "../TaskItem/TaskItem";
import './TaskList.css';

function TaskList({ tasks, onTaskUpdated, onTaskDeleted, onFileUpload }) {
  if (tasks.length === 0) {
    return <p>No tasks found.</p>;
  }

  return (
    <section className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onTaskUpdated={onTaskUpdated}
          onTaskDeleted={onTaskDeleted}
          onFileUpload={onFileUpload}
        />
      ))}
    </section>
  );
}

export default TaskList;
