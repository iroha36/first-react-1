import React from 'react';
import { Task } from '../models/Task';
import './TaskList.css'; // ← CSSファイルをインポート

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: number) => void;
  onReorderTasks: (updatedTasks: Task[]) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onToggleComplete,
  onReorderTasks
}) => {
  // 例として単一リストでの並び替えを示します（DnD 導入前など）
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
          <h3 className="task-list-title">{task.title}</h3>
          <p className="task-list-desc">{task.description}</p>
          <button
            onClick={() => onToggleComplete(task.id)}
            className="task-list-button"
          >
            {task.completed ? 'Move to Pending' : 'Mark as Completed'}
          </button>
          {/* テスト用に並び替えのボタンを付けるサンプル */}
          {index < tasks.length - 1 && (
            <button onClick={() => handleReorder(index, index + 1)}>
              ↓ Move Down
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;