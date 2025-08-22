import React from 'react';

function Column({ name, columnKey, tasks, onAddTask, onDragStart, onDrop, onEdit, onDelete }) {
  return (
    <div
      className="column"
      onDrop={(e) => onDrop(e, columnKey)}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className={`column-header ${columnKey}`}>
        <div className="header-left">
          <span>{name} </span>
          <span className="header-count">{tasks.length}</span>
        </div>
        <div className="header-actions">
          <button className="header-action-btn">⋮</button>
          <button
            className="header-action-btn"
            onClick={() => onAddTask(columnKey)}
            title="Add task"
          >
            +
          </button>
        </div>
      </div>

      {tasks.map((task) => (
        <div
          key={task.id}
          className="card"
          draggable
          onDragStart={(e) => onDragStart(e, task.id, columnKey)}
        >
          <div className={`card-header card-status-${columnKey}`}>
            <span>TMYT-{task.id}</span>
            <div className="card-actions">
              <button
                className="card-action-btn"
                onClick={() => onEdit(task, columnKey)}
                title="Edit"
              >
                ✎
              </button>
              <button
                className="card-action-btn"
                onClick={() => onDelete(task.id, columnKey)}
                title="Delete"
              >
                ×
              </button>
            </div>
          </div>
          <div className="card-content">
            <div className="card-title">{task.title}</div>
            <div className="card-description">{task.description}</div>
          </div>
        </div>
      ))}

      <div className="add-task-wrapper">
        <button
          className="add-task-button"
          onClick={() => onAddTask(columnKey)}
        >
          <span className="add-icon">+</span>
          <span>Add Task</span>
        </button>
      </div>
    </div>
  );
}

export default Column;
