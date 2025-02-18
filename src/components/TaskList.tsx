import React from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from 'react-beautiful-dnd';
import { Task } from '../models/Task';
import './TaskList.css';

interface TaskListProps {
  tasks: Task[];
  onReorderTasks: (updatedTasks: Task[]) => void;
}

// 各レーンをまとめた構造に変換
function buildColumns(tasks: Task[]) {
  return {
    todo: tasks.filter((task) => task.status === 'todo'),
    inprogress: tasks.filter((task) => task.status === 'inprogress'),
    done: tasks.filter((task) => task.status === 'done')
  };
}

// カラム構造をフラットなタスク配列に戻す
function flattenColumns(columns: Record<string, Task[]>) {
  return [...columns.todo, ...columns.inprogress, ...columns.done];
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onReorderTasks
}) => {
  // ドラッグ終了時に呼ばれる
  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return; // ドロップ先がない場合は処理しない

    // 同じ位置にドロップした場合は処理しない
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // カラムごとにタスクを仕分け
    const columns = buildColumns(tasks);

    // source, destination から元の配列を取り出す
    const sourceTasks = columns[source.droppableId as keyof typeof columns];
    const destTasks = columns[destination.droppableId as keyof typeof columns];

    // 移動させるタスクを取り出す
    const [movedTask] = sourceTasks.splice(source.index, 1);

    // タスクのステータスをドロップ先カラムに書き換え
    movedTask.status = destination.droppableId as 'todo' | 'inprogress' | 'done';

    // 挿入する
    destTasks.splice(destination.index, 0, movedTask);

    // カラムを平坦化して更新
    const updated = flattenColumns(columns);
    onReorderTasks(updated);
  };

  // レンダリング用データ作成
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
                      draggableId={task.id.toString()}
                      index={index}
                      key={task.id}
                    >
                      {(providedInner) => (
                        <li
                          className="task-list-item"
                          ref={providedInner.innerRef}
                          {...providedInner.draggableProps}
                          {...providedInner.dragHandleProps}
                        >
                          <h3 className="task-list-title">{task.title}</h3>
                          <p className="task-list-desc">{task.description}</p>
                          <p>status: {task.status}</p>
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