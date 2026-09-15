function TaskItem({ task }) {
  return (
    <article>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>
        <strong>Status:</strong> {task.status}
      </p>
      {task.dueDate && (
        <p>
          <strong>Due Date:</strong> {' '}
          {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}
    </article>
  )
}

export default TaskItem;
