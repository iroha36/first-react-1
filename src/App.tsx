// Main application component
import React, { useState } from 'react';
import { Task } from './models/Task';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const toggleComplete = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div>
      <h1>Task Management</h1>
      <TaskForm onAddTask={addTask} />
      <TaskList tasks={tasks} onToggleComplete={toggleComplete} />
    </div>
  );
};

export default App;