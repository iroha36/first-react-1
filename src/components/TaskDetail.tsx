import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Task } from '../models/Task';
import './TaskDetail.css';

interface TaskDetailProps {
  tasks: Task[];
  onUpdateTask: (id: number, updated: Partial<Task>) => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ tasks, onUpdateTask }) => {
  const { id } = useParams();
  const taskId = Number(id);
  const task = tasks.find((t) => t.id === taskId);

  const [editTitle, setEditTitle] = useState(task?.title || '');
  const [editDescription, setEditDescription] = useState(task?.description || '');
  const [pressed, setPressed] = useState(false);

  if (!task) {
    return (
      <div className="task-detail-container">
        <h2 className="task-detail-title">Task not found</h2>
        <Link to="/" className="task-detail-back-link">
          Back to Task List
        </Link>
      </div>
    );
  }

  const handleSave = () => {
    onUpdateTask(taskId, { title: editTitle, description: editDescription });
    setPressed(true);

    // 1秒後にクラス削除
    setTimeout(() => {
      setPressed(false);
    }, 1000);
  };

  return (
    <div className="task-detail-container">
      <h2 className="task-detail-title">Task Detail</h2>

      <div className="task-detail-field">
        <span className="task-detail-label">Title:</span>
        <input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
      </div>

      <div className="task-detail-field">
        <span className="task-detail-label">Description:</span>
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
        />
      </div>

      <button
        onClick={handleSave}
        className={`task-detail-save-button ${pressed ? 'pressed' : ''}`}
      >
        &#x2713;
      </button>

      <Link to="/" className="task-detail-back-link">
        Back to Task List
      </Link>
    </div>
  );
};

export default TaskDetail;