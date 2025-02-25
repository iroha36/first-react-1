import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Task } from './models/Task';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';
import TaskForm from './components/TaskForm';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    if (!task.title) return;
    setTasks((prev) => [...prev, task]);
  };

  const onUpdateTask = (id: number, updated: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, ...updated } : task
      )
    );
  };

  return (
    <BrowserRouter>
      {/* ナビゲーションが消えていたら復元 */}
      <nav style={{ marginBottom: '1rem' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Task List</Link>
        <Link to="/create">Create Task</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <TaskList
              tasks={tasks}
              onReorderTasks={setTasks}
            />
          }
        />
        <Route
          path="/create"
          element={<TaskForm onAddTask={addTask} />}
        />
        <Route
          path="/task/:id"
          element={<TaskDetail tasks={tasks} onUpdateTask={onUpdateTask} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;