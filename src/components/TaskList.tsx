// Displays tasks in a list
import React from 'react';
import { Task } from '../models/Task';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete }) => {
  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>
              Status:{' '}
              <button onClick={() => onToggleComplete(task.id)}>
                {task.completed ? 'Completed' : 'Pending'}
              </button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;