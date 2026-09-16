import { useState } from 'react';
import './TaskEditForm.css';

function TaskEditForm({ task, onSave, onCancel }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [dueDate, setDueDate] = useState(
    task.dueDate ? task.dueDate.split('T')[0] : ''
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTask = {
      ...task,
      title,
      description,
      status,
      dueDate: dueDate || null,
    };

    await onSave(updatedTask);
  }

  return (
    <form className="task-edit-form" onSubmit={handleSubmit}>
      <h3>Edit Task</h3>
      <label htmlFor={`title-${task.id}`}>Title</label>
      <input
        id={`title-${task.id}`}
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />

      <label htmlFor={`description-${task.id}`}>Description</label>
      <textarea
        id={`description-${task.id}`}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <label htmlFor={`status-${task.id}`}>Status</label>
      <select
        id={`status-${task.id}`}
        value={status}
        onChange={(event) => setStatus(event.target.value)}
      >
        <option value="NotStarted">Not started</option>
        <option value="InProgress">In progress</option>
        <option value="Completed">Completed</option>
      </select>

      <label htmlFor={`dueDate-${task.id}`}>Due date</label>
      <input
        id={`dueDate-${task.id}`}
        type="date"
        value={dueDate}
        onChange={(event) => setDueDate(event.target.value)}
      />
      <div className="form-buttons">
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
      </div>
    </form>
  )
}

export default TaskEditForm