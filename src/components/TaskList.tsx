import React from 'react';
import { Link } from 'react-router-dom';
import { Task } from '../models/Task';
import './TaskList.css';

interface TaskListProps {
  tasks: Task[];
  onReorderTasks: (updatedTasks: Task[]) => void;
  onUpdateStatus?: (id: number, newStatus: 'todo' | 'inprogress' | 'done') => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onReorderTasks,
  onUpdateStatus
}) => {
  const todoTasks = tasks.filter((task) => task.status === 'todo');
  const inProgressTasks = tasks.filter((task) => task.status === 'inprogress');
  const doneTasks = tasks.filter((task) => task.status === 'done');

  // 簡易的な並び替えのサンプル関数
  const handleReorder = (list: Task[], indexA: number, indexB: number) => {
    const copied = [...list];
    const temp = copied[indexA];
    copied[indexA] = copied[indexB];
    copied[indexB] = temp;

    const other = tasks.filter((t) => t.status !== copied[0].status);
    const updatedTasks = [...other, ...copied];
    onReorderTasks(updatedTasks);
  };

  const renderColumn = (
    title: string,
    list: Task[],
    status: 'todo' | 'inprogress' | 'done'
  ) => (
    <div className="task-column">
      <h2 className="task-column-title">{title}</h2>
      <ul className="task-list">
        {list.map((task, index) => (
          <li key={task.id} className="task-list-item">
            <h3 className="task-list-title">
              <Link to={`/task/${task.id}`}>
                {task.title}
              </Link>
            </h3>
            <p className="task-list-desc">{task.description}</p>

            {/* ステータス移動ボタン */}
            {onUpdateStatus && status !== 'todo' && (
              <button
                className="task-list-button"
                onClick={() => onUpdateStatus(task.id, 'todo')}
              >
                Move to To Do
              </button>
            )}
            {onUpdateStatus && status !== 'inprogress' && (
              <button
                className="task-list-button"
                onClick={() => onUpdateStatus(task.id, 'inprogress')}
              >
                Move to In Progress
              </button>
            )}
            {onUpdateStatus && status !== 'done' && (
              <button
                className="task-list-button"
                onClick={() => onUpdateStatus(task.id, 'done')}
              >
                Move to Done
              </button>
            )}

            {/* 並び替えボタンの一例 */}
            {index < list.length - 1 && (
              <button
                className="task-list-button"
                onClick={() => handleReorder(list, index, index + 1)}
              >
                ↓
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="task-board">
      {renderColumn('To Do', todoTasks, 'todo')}
      {renderColumn('In Progress', inProgressTasks, 'inprogress')}
      {renderColumn('Done', doneTasks, 'done')}
    </div>
  );
};

export default TaskList;