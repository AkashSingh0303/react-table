import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import '../App.css';

// Map column keys to color/status classes
const statusClassMap = {
  readyToStart: "ready",
  inProgress: "progress",
  waitingReview: "review",
  pendingDeploy: "deploy",
  done: "done",
  stuck: "stuck",
  blank: "blank"
};

// Reusable Column component
function Column({ 
  title, 
  columnKey, 
  tasks, 
  onAddTask, 
  onEditTask, 
  onDeleteTask, 
  onDragStart, 
  onDrop, 
  onDragOver, 
  onEditColumnTitle
}) {
  return (
    <div 
      className="column"
      onDrop={(e) => onDrop(e, columnKey)}
      onDragOver={onDragOver}
    >
      {/* Column Header with color */}
      <div className={`column-header ${statusClassMap[columnKey]}`}>
        <div className="header-left">
          <span>{title} </span>
          <span className="header-count">{tasks.length}</span>
        </div>
        <div className="header-actions">
          {/* Edit Column Button */}
          <button 
            className="header-action-btn"
            title="Edit column title"
            onClick={() => onEditColumnTitle(columnKey, title)}
          >
            ✎
          </button>
          <button 
            className="header-action-btn" 
            title="Add task" 
            onClick={() => onAddTask(columnKey)}
          >
            +
          </button>
        </div>
      </div>

      {/* Task Cards */}
      {tasks.map(task => (
        <div
          key={task.id}
          className="card"
          draggable
          onDragStart={(e) => onDragStart(e, task.id, columnKey)}
        >
          <div className={`card-header card-status-${statusClassMap[columnKey]}`}>
            <span>TMYT-{task.id}</span>
            <div className="card-actions">
              <button 
                className="card-action-btn"
                onClick={() => onEditTask(task, columnKey)}
                title="Edit"
              >
                ✎
              </button>
              <button 
                className="card-action-btn"
                onClick={() => onDeleteTask(task.id, columnKey)}
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

function KanbanBoard() {
  const [tasks, setTasks] = useState({
    readyToStart: [
      { id: 1, title: 'Task 1', description: 'Add your task description here...' },
      { id: 2, title: 'Task 2', description: 'Add your task description here...' }
    ],
    inProgress: [
      { id: 3, title: 'Task 3', description: 'Add your task description here...' }
    ],
    waitingReview: [],
    pendingDeploy: [],
    done: [
      { id: 4, title: 'Task 4', description: 'Add your task description here...' }
    ],
    stuck: [],
    blank: []
  });

  // --- Column Titles State ---
  const [columnTitles, setColumnTitles] = useState({
    readyToStart: "Ready to start",
    inProgress: "In Progress",
    waitingReview: "Waiting for review",
    pendingDeploy: "Pending Deploy",
    done: "Done",
    stuck: "Stuck",
    blank: "Blank"
  });

  // --- Modals ---
  const [deleteModal, setDeleteModal] = useState({ open: false, taskId: null, column: null });
  const [editModal, setEditModal] = useState({ 
    open: false, 
    taskId: null, 
    column: null, 
    title: '', 
    description: '' 
  });
  const [editColumnModal, setEditColumnModal] = useState({
    open: false,
    columnKey: null,
    title: ""
  });

  // --- Drag and Drop ---
  const handleDragStart = (e, taskId, sourceColumn) => {
    e.dataTransfer.setData('taskId', taskId);
    e.dataTransfer.setData('sourceColumn', sourceColumn);
  };

  const handleDrop = (e, targetColumn) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    const sourceColumn = e.dataTransfer.getData('sourceColumn');

    if (sourceColumn !== targetColumn) {
      setTasks(prev => {
        const task = prev[sourceColumn].find(t => t.id === taskId);
        const newSourceTasks = prev[sourceColumn].filter(t => t.id !== taskId);
        return {
          ...prev,
          [sourceColumn]: newSourceTasks,
          [targetColumn]: [...prev[targetColumn], task]
        };
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // --- Task Actions ---
  const handleAddTask = (column) => {
    const allTasks = Object.values(tasks).flat();
    const newId = allTasks.length > 0 ? Math.max(...allTasks.map(t => t.id)) + 1 : 1;
    const newTask = {
      id: newId,
      title: `New Task ${newId}`,
      description: 'Add your task description here...'
    };

    setTasks(prev => ({
      ...prev,
      [column]: [...prev[column], newTask]
    }));
  };

  const handleDeleteConfirm = () => {
    if (deleteModal.taskId && deleteModal.column) {
      setTasks(prev => ({
        ...prev,
        [deleteModal.column]: prev[deleteModal.column].filter(task => task.id !== deleteModal.taskId)
      }));
      setDeleteModal({ open: false, taskId: null, column: null });
    }
  };

  const handleEditConfirm = () => {
    if (editModal.taskId && editModal.column) {
      handleEditTask(
        editModal.taskId, 
        editModal.column, 
        editModal.title, 
        editModal.description
      );
      setEditModal({ open: false, taskId: null, column: null, title: '', description: '' });
    }
  };

  const handleEditTask = (taskId, column, newTitle, newDescription) => {
    setTasks(prev => ({
      ...prev,
      [column]: prev[column].map(task => 
        task.id === taskId 
          ? { ...task, title: newTitle, description: newDescription }
          : task
      )
    }));
  };

  // --- Column Title Update ---
  const handleEditColumnConfirm = () => {
    if (editColumnModal.columnKey) {
      setColumnTitles(prev => ({
        ...prev,
        [editColumnModal.columnKey]: editColumnModal.title
      }));
      setEditColumnModal({ open: false, columnKey: null, title: "" });
    }
  };

  return (
    <>
      <div className="kanban-board">
        {Object.keys(tasks).map((colKey) => (
          <Column
            key={colKey}
            title={columnTitles[colKey]}
            columnKey={colKey}
            tasks={tasks[colKey]}
            onAddTask={handleAddTask}
            onEditTask={(task, col) => setEditModal({ open: true, taskId: task.id, column: col, title: task.title, description: task.description })}
            onDeleteTask={(id, col) => setDeleteModal({ open: true, taskId: id, column: col })}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onEditColumnTitle={(colKey, currentTitle) => 
              setEditColumnModal({ open: true, columnKey: colKey, title: currentTitle })
            }
          />
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, taskId: null, column: null })}
      >
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>Are you sure you want to delete this task?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModal({ open: false, taskId: null, column: null })}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Task Modal */}
      <Dialog
        open={editModal.open}
        onClose={() => setEditModal({ open: false, taskId: null, column: null, title: '', description: '' })}
        fullWidth maxWidth="sm"
      >
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField margin="dense" label="Title" fullWidth value={editModal.title}
            onChange={(e) => setEditModal(prev => ({ ...prev, title: e.target.value }))}/>
          <TextField margin="dense" label="Description" fullWidth multiline rows={4} value={editModal.description}
            onChange={(e) => setEditModal(prev => ({ ...prev, description: e.target.value }))}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModal({ open: false, taskId: null, column: null, title: '', description: '' })}>Cancel</Button>
          <Button onClick={handleEditConfirm} color="primary" variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Column Title Modal */}
      <Dialog
        open={editColumnModal.open}
        onClose={() => setEditColumnModal({ open: false, columnKey: null, title: "" })}
        fullWidth maxWidth="xs"
      >
        <DialogTitle>Edit Column Title</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Column Title"
            fullWidth
            value={editColumnModal.title}
            onChange={(e) => setEditColumnModal(prev => ({ ...prev, title: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditColumnModal({ open: false, columnKey: null, title: "" })}>
            Cancel
          </Button>
          <Button onClick={handleEditColumnConfirm} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default KanbanBoard;
