import { useState } from "react";
import TaskItem from "../TaskItem/TaskItem";
import './TaskList.css';

function TaskList({ tasks, onTaskUpdated, onTaskDeleted, onFileUpload }) {
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTasks = tasks.filter(task => {
    const matchesStatus =
    statusFilter === 'All' || task.status === statusFilter;
  
    const matchesSearch = task.title.toLowerCase()
      .includes(searchQuery.trim().toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <section aria-labelledby="task-list-title">
      <div className="task-list-header">
        <h2 id="task-list-title">Tasks</h2>

        <div className="task-search">
          <label htmlFor="task-search">Search tasks</label>
          <input
            id="task-search"
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search by title..."
          />
        </div>

        <div className="task-status-filter">
          <label htmlFor="task-status-filter">Filter by status</label>
          <select
            id="task-status-filter"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="All">All tasks</option>
            <option value="NotStarted">Not started</option>
            <option value="InProgress">In progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <p>
          {tasks.length === 0
            ? "No tasks found."
            : "No tasks match your search or status filter."}
        </p>
      ) : (
        <div className="task-list">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onTaskUpdated={onTaskUpdated}
              onTaskDeleted={onTaskDeleted}
              onFileUpload={onFileUpload}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default TaskList;
