// Form for adding a new task
import React, { useState } from 'react';
import { Task } from '../models/Task';

interface TaskFormProps {
  onAddTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      completed: false
    };
    onAddTask(newTask);
    setTitle('');
    setDescription('');
  };

  return (
    <div
      style={{
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '1rem',
        padding: '1rem',
      }}
    >
      <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem' }}>
        Create a New Task
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
      >
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: '0.5rem',
            fontSize: '1rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
          }}
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            padding: '0.5rem',
            fontSize: '1rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            minHeight: '80px',
          }}
        />
        <button
          type="submit"
          style={{
            alignSelf: 'flex-start',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#007acc',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;