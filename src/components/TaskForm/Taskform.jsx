import { useState } from 'react';

function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const task = {
      title,
      description,
      status,
      dueDate: dueDate || null,
    };

    await onTaskCreated(task);

    setTitle("");
    setDescription("");
    setStatus("NotStarted");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add task</h2>

      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <label htmlFor="status">Status</label>
      <select
        id="status"
        value={status}
        onChange={(event) => setStatus(event.target.value)}
      >
        <option value="NotStarted">Not started</option>
        <option value="InProgress">In progress</option>
        <option value="Completed">Completed</option>
      </select>

      <label htmlFor="dueDate">Due date</label>
      <input
        id="dueDate"
        type="date"
        value={dueDate}
        onChange={(event) => setDueDate(event.target.value)}
      />

      <button type="submit">Add task</button>
    </form>
  );
}

export default TaskForm;