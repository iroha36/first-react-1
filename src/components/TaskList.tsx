import React from 'react';
import { Link } from 'react-router-dom';
import { Task } from '../models/Task';
import './TaskList.css';
// 追加
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from 'react-beautiful-dnd';

interface TaskListProps {
  tasks: Task[];
  onReorderTasks: (updatedTasks: Task[]) => void;
  onUpdateStatus?: (id: number, newStatus: 'todo' | 'inprogress' | 'done') => void;
}

// カラムをオブジェクトにまとめる
function buildColumns(tasks: Task[]) {
  return {
    todo: tasks.filter((task) => task.status === 'todo'),
    inprogress: tasks.filter((task) => task.status === 'inprogress'),
    done: tasks.filter((task) => task.status === 'done')
  };
}

// カラムをフラットな配列に戻す
function flattenColumns(columns: Record<string, Task[]>) {
  return [...columns.todo, ...columns.inprogress, ...columns.done];
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onReorderTasks,
  onUpdateStatus
}) => {
  // ドラッグ終了時の処理
  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // ドロップ先が無い場合や、同じ場所へのドロップは何もしない
    if (!destination || (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )) {
      return;
    }

    // カラムごとにタスクを仕分け
    const columns = buildColumns(tasks);
    const sourceList = columns[source.droppableId as keyof typeof columns];
    const destList = columns[destination.droppableId as keyof typeof columns];

    // 移動させるタスクを取り出す
    const [movedTask] = sourceList.splice(source.index, 1);
    // タスクの status をドロップ先に合わせる
    movedTask.status = destination.droppableId as 'todo' | 'inprogress' | 'done';

    // カラムに挿入
    destList.splice(destination.index, 0, movedTask);

    // すべてを平坦化して更新コールバック
    const updatedTasks = flattenColumns(columns);
    onReorderTasks(updatedTasks);
  };

  // レーン情報を準備
  const columns = buildColumns(tasks);
  const laneInfo = [
    { id: 'todo', title: 'To Do', items: columns.todo },
    { id: 'inprogress', title: 'In Progress', items: columns.inprogress },
    { id: 'done', title: 'Done', items: columns.done }
  ];

  return (
    <div className="task-board">
      <DragDropContext onDragEnd={handleDragEnd}>
        {laneInfo.map((lane) => (
          <Droppable droppableId={lane.id} key={lane.id}>
            {(provided) => (
              <div className="task-column">
                <h2 className="task-column-title">{lane.title}</h2>
                <ul
                  className="task-list"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {lane.items.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {(providedInner) => (
                        <li
                          className="task-list-item"
                          ref={providedInner.innerRef}
                          {...providedInner.draggableProps}
                          {...providedInner.dragHandleProps}
                        >
                          <h3 className="task-list-title">
                            <Link to={`/task/${task.id}`}>
                              {task.title}
                            </Link>
                          </h3>
                          <p className="task-list-desc">
                            {task.description}
                          </p>

                          {/* ステータス移動ボタン（任意） */}
                          {onUpdateStatus && lane.id !== 'todo' && (
                            <button
                              className="task-list-button"
                              onClick={() => onUpdateStatus(task.id, 'todo')}
                            >
                              Move to To Do
                            </button>
                          )}
                          {onUpdateStatus && lane.id !== 'inprogress' && (
                            <button
                              className="task-list-button"
                              onClick={() => onUpdateStatus(task.id, 'inprogress')}
                            >
                              Move to In Progress
                            </button>
                          )}
                          {onUpdateStatus && lane.id !== 'done' && (
                            <button
                              className="task-list-button"
                              onClick={() => onUpdateStatus(task.id, 'done')}
                            >
                              Move to Done
                            </button>
                          )}
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default TaskList;