import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Task } from './models/Task';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    if (task.title === '') return;
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const updateStatus = (id: number, newStatus: 'todo' | 'inprogress' | 'done') => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
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
          element={
            <TaskList
              tasks={tasks}
              onReorderTasks={setTasks}
              onUpdateStatus={updateStatus}
            />
          }
        />
        <Route
          path="/create"
          element={<TaskForm onAddTask={addTask} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;