import './TaskOverview.css';

function TaskOverview({ tasks }) {
  const inProgressCount = tasks.filter(task => task.status === 'InProgress').length;
  const completedCount = tasks.filter(task => task.status === 'Completed').length;

  return (
    <section className="task-overview" aria-labelledby="task-overview-title">
      <h2 id="task-overview-title">Overview</h2>

      <dl className="task-overview-stats">
        <div className="task-overview-card">
          <dt>Total tasks</dt>
          <dd>{tasks.length}</dd>
        </div>
        <div className="task-overview-card">
          <dt>In progress</dt>
          <dd>{inProgressCount}</dd>
        </div>
        <div className="task-overview-card">
          <dt>Completed</dt>
          <dd>{completedCount}</dd>
        </div>
      </dl>
    </section>
  );
}

export default TaskOverview;
