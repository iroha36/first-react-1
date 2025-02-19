
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Task } from '../models/Task';
import './TaskDetail.css';

interface TaskDetailProps {
  tasks: Task[];
}

const TaskDetail: React.FC<TaskDetailProps> = ({ tasks }) => {
  const { id } = useParams();
  const taskId = Number(id);

  // 対象のタスクを検索
  const task = tasks.find((t) => t.id === taskId);

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

  return (
    <div className="task-detail-container">
      <h2 className="task-detail-title">Task Detail</h2>
      <p className="task-detail-field">
        <span className="task-detail-label">Title:</span> {task.title}
      </p>
      <p className="task-detail-field">
        <span className="task-detail-label">Description:</span> {task.description}
      </p>
      <p className="task-detail-field">
        <span className="task-detail-label">Status:</span> {task.status}
      </p>
      <Link to="/" className="task-detail-back-link">
        Back to Task List
      </Link>
    </div>
  );
};

export default TaskDetail;