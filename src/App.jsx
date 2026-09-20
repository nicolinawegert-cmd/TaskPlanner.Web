import { useEffect, useState } from "react";
import './App.css'
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import { createTask, deleteTask, getTasks, updateTask, uploadTaskFile } from "./services/taskService";

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
      return true;
    } catch (error) {
      console.error(error);
      setError("Could not create task. Please try again.");
      return false;
    }
  };

  const handleTaskUpdated = async (id, task) => {
    try {
      const updatedTask = await updateTask(id, task);
      
      setTasks(currentTasks =>
        currentTasks.map(currentTask =>
          currentTask.id === id ? updatedTask : currentTask
        )
      )
      
      setError(null);
      return true
    } catch (error) {
      console.error(error);
      setError("Could not update task. Please try again.");
      return false;
    }
  }

  const handleTaskDeleted = async (id) => {
    try {
      await deleteTask(id);

      setTasks(currentTasks => currentTasks.filter(task => task.id !== id));
      setError(null);
      return true;
    } catch (error) {
      console.error(error);
      setError("Could not delete task. Please try again.");
      return false;
    }
  };

  const handleFileUpload = async (id, file) => {
    try {
      const updatedTask = await uploadTaskFile(id, file)

      setTasks(currentTasks =>
        currentTasks.map(task =>
          task.id === id ? updatedTask : task
        )
      )

      setError(null);
      return true;
    } catch (error) {
      console.error(error);
      setError("Could not upload file. Please try again.");
      return false;
    }
  }
  

  return (
    <main className="app">
      <h1>Task Planner</h1>

      <TaskForm onTaskCreated={handleTaskCreated} />

      {error && <p role="alert">{error}</p>}

      {loading ? <p>Loading tasks...</p> :
        <TaskList
          tasks={tasks}
          onTaskUpdated={handleTaskUpdated}
          onTaskDeleted={handleTaskDeleted}
          onFileUpload={handleFileUpload}
        />}
    </main>
  );
}

export default App;
