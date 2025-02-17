import React, { useState } from 'react';
import { Task } from '../models/Task';
import './TaskForm.css';

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 新規タスクは "todo" 状態で作成
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      status: 'todo'
    };
    onAddTask(newTask);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="task-form-container">
      <h2 className="task-form-title">Create a New Task</h2>
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="task-form-input"
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="task-form-textarea"
        />
        <button type="submit" className="task-form-button">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;