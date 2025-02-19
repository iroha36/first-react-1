import React from 'react';
import { Link } from 'react-router-dom';
import { Task } from '../models/Task';
import './TaskList.css';

interface TaskListProps {
  tasks: Task[];
  onReorderTasks: (updatedTasks: Task[]) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onReorderTasks }) => {
  // ダミー: 並び替えのサンプル関数
  const handleReorder = (indexA: number, indexB: number) => {
    const updatedTasks = [...tasks];
    const temp = updatedTasks[indexA];
    updatedTasks[indexA] = updatedTasks[indexB];
    updatedTasks[indexB] = temp;
    onReorderTasks(updatedTasks);
  };

  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <li key={task.id} className="task-list-item">
          {/* タイトルのみ表示し、クリックで詳細ページへ */}
          <h3 className="task-list-title">
            <Link to={`/task/${task.id}`}>
              {task.title}
            </Link>
          </h3>
          {/* 並び替え（例） */}
          {index < tasks.length - 1 && (
            <button onClick={() => handleReorder(index, index + 1)}>
              ↓
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;