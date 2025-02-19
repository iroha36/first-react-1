import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Task } from './models/Task';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    if (!task.title) return;
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const reorderTasks = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
  };

  return (
    <BrowserRouter>
      <nav style={{ marginBottom: '1rem' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Task List</Link>
        <Link to="/create">Create Task</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={<TaskList tasks={tasks} onReorderTasks={reorderTasks} />}
        />
        <Route
          path="/create"
          element={<TaskForm onAddTask={addTask} />}
        />
        {/* タスク詳細ページ: /task/:id */}
        <Route
          path="/task/:id"
          element={<TaskDetail tasks={tasks} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;