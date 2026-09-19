import { useState } from "react";
import TaskEditForm from "../TaskForm/TaskEditForm";
import FileUpload from "../FileUpload/FileUpload";
import './TaskItem.css';

function TaskItem({ task, onTaskUpdated, onFileUpload }) {
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
    <article className="task-item">
      <h2>{task.title}</h2>

      <p>{task.description}</p>

      <p>
        <strong>Status:</strong> {task.status}
      </p>

      {task.dueDate && (
        <p>
          <strong>Due date:</strong>{" "}
          {new Date(task.dueDate).toLocaleDateString()}
        </p>
      )}

      {task.fileName && (
        <p>
          <strong>File:</strong>{" "}
          <a
            href={`http://localhost:5035/uploads/${task.fileName}`}
            target="_blank"
            rel="noreferrer"
          >
            {task.fileName}
          </a>
        </p>
      )}

      <button
        className="edit-button"
        type="button"
        onClick={() => setIsEditing(true)}
      >
        Edit
      </button>

      <FileUpload taskId={task.id} onFileUpload={onFileUpload} />
    </article>
  );
}

export default TaskItem;
