import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Task } from '../models/Task';

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
      <div>
        <h2>Task not found</h2>
        <Link to="/">Back to Task List</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Task Detail</h2>
      <p><strong>Title:</strong> {task.title}</p>
      <p><strong>Description:</strong> {task.description}</p>
      <p><strong>Status:</strong> {task.status}</p>
      <Link to="/">Back to Task List</Link>
    </div>
  );
};

export default TaskDetail;