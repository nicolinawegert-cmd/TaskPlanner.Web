import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5035/api/tasks');

        if (!response.ok) {
          throw new Error('Could not fetch tasks');
        }

        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setError('Could not load tasks. Please try again later.');
      } finally { 
        setLoading(false);
      }
    }

    fetchTasks()
  }, [])

  return (
    <main>
      <h1>Task Planner</h1>

      {loading && <p>Loading tasks...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && tasks.length === 0 && (
        <p>No tasks available.</p>
      )}

      
      {!loading && !error && tasks.map(task => (
        <div key={task.id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
        </div>
      ))}
    </main>
  )
}

export default App;
