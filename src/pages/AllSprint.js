// src/components/AllSprints.js
import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Select,
  MenuItem,
  Paper,
  Chip,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

export default function AllSprints() {
  const [tasks, setTasks] = useState([
    { sprint: "Sprint 1", task: "Login Fix", owner: "Alex", status: "Done", type: "Bug", sp: 2 },
    { sprint: "Sprint 2", task: "Dashboard UI", owner: "Sam", status: "In Progress", type: "Feature", sp: 8 },
  ]);

  const [editing, setEditing] = useState({ row: null, field: null });

  const [newTask, setNewTask] = useState({
    sprint: "",
    task: "",
    owner: "",
    status: "Ready to start",
    type: "",
    sp: "",
  });

  const handleUpdateTask = (rowIndex, field, value) => {
    const updated = [...tasks];
    updated[rowIndex][field] = value;
    setTasks(updated);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleAddTask = () => {
    if (!newTask.sprint || !newTask.task) return;
    setTasks([...tasks, newTask]);
    setNewTask({ sprint: "", task: "", owner: "", status: "Ready to start", type: "", sp: "" });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const statusColors = {
    "Ready to start": { bg: "#0073ea", color: "white" },
    "In Progress": { bg: "#f9a825", color: "white" },
    Done: { bg: "#2e7d32", color: "white" },
    Other: { bg: "#0288d1", color: "white" },
  };

  return (
    <Box>
      <TableContainer component={Paper} sx={{ border: "1px solid #e0e0e0" }}>
        <Table
          size="small"
          sx={{
            borderCollapse: "collapse",
            "& td, & th": {
              border: "1px solid #e0e0e0",
              padding: "6px 10px",
              fontSize: "0.85rem",
              color: "black",
            },
            "& th": {
              backgroundColor: "#f5f6f8",
              fontWeight: 600,
              color: "black",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Sprint</TableCell>
              <TableCell>Task</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Estimated SP</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((t, rowIdx) => (
              <TableRow key={rowIdx}>
                {/* Sprint */}
                <TableCell onClick={() => setEditing({ row: rowIdx, field: "sprint" })}>
                  {editing.row === rowIdx && editing.field === "sprint" ? (
                    <TextField
                      size="small"
                      autoFocus
                      value={t.sprint}
                      onChange={(e) => handleUpdateTask(rowIdx, "sprint", e.target.value)}
                      onBlur={() => setEditing({ row: null, field: null })}
                      onKeyDown={(e) => e.key === "Enter" && setEditing({ row: null, field: null })}
                    />
                  ) : (
                    t.sprint
                  )}
                </TableCell>

                {/* Task */}
                <TableCell onClick={() => setEditing({ row: rowIdx, field: "task" })}>
                  {editing.row === rowIdx && editing.field === "task" ? (
                    <TextField
                      size="small"
                      autoFocus
                      value={t.task}
                      onChange={(e) => handleUpdateTask(rowIdx, "task", e.target.value)}
                      onBlur={() => setEditing({ row: null, field: null })}
                      onKeyDown={(e) => e.key === "Enter" && setEditing({ row: null, field: null })}
                    />
                  ) : (
                    t.task
                  )}
                </TableCell>

                {/* Owner */}
                <TableCell onClick={() => setEditing({ row: rowIdx, field: "owner" })}>
                  {editing.row === rowIdx && editing.field === "owner" ? (
                    <TextField
                      size="small"
                      autoFocus
                      value={t.owner}
                      onChange={(e) => handleUpdateTask(rowIdx, "owner", e.target.value)}
                      onBlur={() => setEditing({ row: null, field: null })}
                      onKeyDown={(e) => e.key === "Enter" && setEditing({ row: null, field: null })}
                    />
                  ) : (
                    t.owner
                  )}
                </TableCell>

                {/* Status */}
                <TableCell onClick={() => setEditing({ row: rowIdx, field: "status" })}>
                  {editing.row === rowIdx && editing.field === "status" ? (
                    <Select
                      size="small"
                      autoFocus
                      value={t.status}
                      onChange={(e) => handleUpdateTask(rowIdx, "status", e.target.value)}
                      onBlur={() => setEditing({ row: null, field: null })}
                      sx={{
                        minWidth: 130,
                        "& .MuiSelect-select": { color: "black" },
                        "& .MuiSelect-icon": { color: "black" },
                      }}
                    >
                      <MenuItem value="Ready to start">Ready to start</MenuItem>
                      <MenuItem value="In Progress">In Progress</MenuItem>
                      <MenuItem value="Done">Done</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  ) : (
                    <Chip
                      label={t.status}
                      size="small"
                      sx={{
                        backgroundColor: statusColors[t.status]?.bg || "#ccc",
                        color: statusColors[t.status]?.color || "black",
                        fontWeight: 600,
                        borderRadius: "6px",
                      }}
                    />
                  )}
                </TableCell>

                {/* Type */}
                <TableCell onClick={() => setEditing({ row: rowIdx, field: "type" })}>
                  {editing.row === rowIdx && editing.field === "type" ? (
                    <TextField
                      size="small"
                      autoFocus
                      value={t.type}
                      onChange={(e) => handleUpdateTask(rowIdx, "type", e.target.value)}
                      onBlur={() => setEditing({ row: null, field: null })}
                      onKeyDown={(e) => e.key === "Enter" && setEditing({ row: null, field: null })}
                    />
                  ) : (
                    t.type
                  )}
                </TableCell>

                {/* SP */}
                <TableCell onClick={() => setEditing({ row: rowIdx, field: "sp" })}>
                  {editing.row === rowIdx && editing.field === "sp" ? (
                    <TextField
                      size="small"
                      type="number"
                      autoFocus
                      value={t.sp}
                      onChange={(e) => handleUpdateTask(rowIdx, "sp", e.target.value)}
                      onBlur={() => setEditing({ row: null, field: null })}
                      onKeyDown={(e) => e.key === "Enter" && setEditing({ row: null, field: null })}
                    />
                  ) : (
                    t.sp
                  )}
                </TableCell>

                {/* Delete */}
                <TableCell align="center">
                  <IconButton color="error" size="small" onClick={() => handleDeleteTask(rowIdx)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {/* Input Row for new tasks */}
            <TableRow>
              <TableCell>
                <TextField
                  size="small"
                  placeholder="Sprint"
                  value={newTask.sprint}
                  onChange={(e) => setNewTask({ ...newTask, sprint: e.target.value })}
                  onKeyPress={handleKeyPress}
                  inputProps={{ style: { color: "black" } }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  placeholder="Task name"
                  value={newTask.task}
                  onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
                  onKeyPress={handleKeyPress}
                  inputProps={{ style: { color: "black" } }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  placeholder="Owner"
                  value={newTask.owner}
                  onChange={(e) => setNewTask({ ...newTask, owner: e.target.value })}
                  onKeyPress={handleKeyPress}
                  inputProps={{ style: { color: "black" } }}
                />
              </TableCell>
              <TableCell>
                <Select
                  size="small"
                  value={newTask.status}
                  onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                  sx={{
                    minWidth: 130,
                    "& .MuiSelect-select": { color: "black" },
                    "& .MuiSelect-icon": { color: "black" },
                  }}
                  onKeyPress={handleKeyPress}
                >
                  <MenuItem value="Ready to start">Ready to start</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Done">Done</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  placeholder="Type"
                  value={newTask.type}
                  onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
                  onKeyPress={handleKeyPress}
                  inputProps={{ style: { color: "black" } }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  type="number"
                  placeholder="SP"
                  value={newTask.sp}
                  onChange={(e) => setNewTask({ ...newTask, sp: e.target.value })}
                  onBlur={handleAddTask}
                  onKeyPress={handleKeyPress}
                  inputProps={{ style: { color: "black" } }}
                />
              </TableCell>
              <TableCell align="center">—</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
