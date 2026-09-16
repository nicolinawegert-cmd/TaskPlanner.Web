import { useState } from 'react';
import TaskEditForm from '../TaskForm/TaskEditForm';

function TaskItem({ task, onTaskUpdated }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async (updatedTask) => {
    const success = await onTaskUpdated(task.id, updatedTask);
    
    if (success) {
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <TaskEditForm
        task={task}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

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

      <button type="button" onClick={() => setIsEditing(true)}>
        Edit
      </button>
    </article>
  )
}

export default TaskItem;
