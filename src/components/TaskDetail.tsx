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
  const [showSaved, setShowSaved] = useState(false);

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
    setShowSaved(true);

    // 数秒後にメッセージを消す
    setTimeout(() => {
      setShowSaved(false);
    }, 2000);
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

      <button onClick={handleSave} className="task-detail-save-button">
        &#x2713; {/* チェックマーク */}
      </button>

      {/* 保存アニメーション用のメッセージ */}
      {showSaved && (
        <div className="task-detail-saved-message">
          Saved!
        </div>
      )}

      <Link to="/" className="task-detail-back-link">
        Back to Task List
      </Link>
    </div>
  );
};

export default TaskDetail;