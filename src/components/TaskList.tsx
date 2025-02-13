// Displays tasks in a list
import React from 'react';
import { Task } from '../models/Task';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvided
} from 'react-beautiful-dnd';

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
  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.index === destination.index && source.droppableId === destination.droppableId) {
      return;
    }

    const updatedTasks = Array.from(tasks);
    const [removed] = updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, removed);
    onReorderTasks(updatedTasks);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="tasks-droppable">
        {(provided) => (
          <ul
            style={{ listStyle: 'none', padding: 0 }}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id.toString()} draggableId={task.id.toString()} index={index}>
                {(providedInner: DraggableProvided) => (
                  <li
                    ref={providedInner.innerRef}
                    {...providedInner.draggableProps}
                    {...providedInner.dragHandleProps}
                    style={{
                      background: '#fff',
                      marginBottom: '1rem',
                      padding: '1rem',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      ...providedInner.draggableProps.style
                    }}
                  >
                    <h3 style={{ margin: 0 }}>{task.title}</h3>
                    <p>{task.description}</p>
                    <button onClick={() => onToggleComplete(task.id)}>
                      {task.completed ? 'Move to Pending' : 'Mark as Completed'}
                    </button>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;