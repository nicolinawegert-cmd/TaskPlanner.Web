import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import { createTask, getTasks } from "./services/taskService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error(error);
        setError("Could not load tasks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const handleTaskCreated = async (task) => {
    try {
      const createdTask = await createTask(task);

      setTasks((currentTasks) => [...currentTasks, createdTask]);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Could not create task. Please try again.");
    }
  };

  return (
    <main>
      <h1>Task Planner</h1>

      <TaskForm onTaskCreated={handleTaskCreated} />

      {error && <p>{error}</p>}

      {loading ? <p>Loading tasks...</p> : <TaskList tasks={tasks} />}
    </main>
  );
}

export default App;
