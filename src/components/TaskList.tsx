import React from 'react';
import { Task } from '../models/Task';
import './TaskList.css';

interface TaskListProps {
  tasks: Task[];
  onReorderTasks: (updatedTasks: Task[]) => void;
  onToggleComplete?: (id: number) => void;
  onUpdateStatus?: (id: number, newStatus: 'todo' | 'inprogress' | 'done') => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onReorderTasks,
  onToggleComplete,
  onUpdateStatus
}) => {
  // 例: to do／進行中／完了 に仕分け
  const todoTasks = tasks.filter((task) => task.status === 'todo');
  const inProgressTasks = tasks.filter((task) => task.status === 'inprogress');
  const doneTasks = tasks.filter((task) => task.status === 'done');

  // 並び替え: サンプル（簡易）。実際にはドラッグ＆ドロップ実装等を追加
  const handleReorder = (list: Task[], indexA: number, indexB: number) => {
    const updatedList = [...list];
    const temp = updatedList[indexA];
    updatedList[indexA] = updatedList[indexB];
    updatedList[indexB] = temp;

    // 全体のタスク配列を再構築し、onReorderTasks() に渡す
    const otherTasks = tasks.filter((t) => t.status !== list[0].status);
    const updatedTasks = [...otherTasks, ...updatedList];
    onReorderTasks(updatedTasks);
  };

  // レーンごとに表示するUI生成のヘルパー
  const renderColumn = (title: string, columnTasks: Task[], status: 'todo' | 'inprogress' | 'done') => (
    <div className="task-column">
      <h2 className="task-column-title">{title}</h2>
      <ul className="task-list">
        {columnTasks.map((task, index) => (
          <li key={task.id} className="task-list-item">
            <h3 className="task-list-title">{task.title}</h3>
            <p className="task-list-desc">{task.description}</p>

            {/* 状態切り替えボタン例 */}
            {status !== 'todo' && onUpdateStatus && (
              <button
                className="task-list-button"
                onClick={() => onUpdateStatus(task.id, 'todo')}
              >
                Move to To Do
              </button>
            )}
            {status !== 'inprogress' && onUpdateStatus && (
              <button
                className="task-list-button"
                onClick={() => onUpdateStatus(task.id, 'inprogress')}
              >
                Move to In Progress
              </button>
            )}
            {status !== 'done' && onUpdateStatus && (
              <button
                className="task-list-button"
                onClick={() => onUpdateStatus(task.id, 'done')}
              >
                Move to Done
              </button>
            )}

            {/* 並び替え用の簡易ボタン例 (↓) */}
            {index < columnTasks.length - 1 && (
              <button onClick={() => handleReorder(columnTasks, index, index + 1)}>
                ↓ Move Down
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