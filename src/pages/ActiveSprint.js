// src/components/ActiveSprint.js
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
  Select,
  MenuItem,
  Paper,
  Chip,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ActiveSprint() {
  const [tasks, setTasks] = useState([
    { task: "New Task", owner: "John", status: "Ready to start", type: "Feature", sp: 3 },
    { task: "API Fix", owner: "Akash", status: "In Progress", type: "Bug", sp: 5 },
  ]);

  const [editing, setEditing] = useState({ row: null, field: null });

  const [newTask, setNewTask] = useState({
    task: "",
    owner: "",
    status: "Ready to start",
    type: "",
    sp: "",
  });

  const handleSaveNewTask = () => {
    if (!newTask.task) return;
    setTasks([...tasks, newTask]);
    setNewTask({ task: "", owner: "", status: "Ready to start", type: "", sp: "" });
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleEdit = (rowIdx, field, value) => {
    const updated = [...tasks];
    updated[rowIdx][field] = value;
    setTasks(updated);
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
              color: "black !important",
            },
            "& th": {
              backgroundColor: "#f5f6f8",
              fontWeight: 600,
              color: "black !important",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Estimated SP</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((t, idx) => (
              <TableRow key={idx}>
                {/* Task */}
                <TableCell
                  onClick={() => setEditing({ row: idx, field: "task" })}
                >
                  {editing.row === idx && editing.field === "task" ? (
                    <TextField
                      size="small"
                      value={t.task}
                      autoFocus
                      onChange={(e) => handleEdit(idx, "task", e.target.value)}
                      onBlur={() => setEditing({ row: null, field: null })}
                      inputProps={{ style: { color: "black" } }}
                    />
                  ) : (
                    t.task
                  )}
                </TableCell>

                {/* Owner */}
                <TableCell
                  onClick={() => setEditing({ row: idx, field: "owner" })}
                >
                  {editing.row === idx && editing.field === "owner" ? (
                    <TextField
                      size="small"
                      value={t.owner}
                      autoFocus
                      onChange={(e) => handleEdit(idx, "owner", e.target.value)}
                      onBlur={() => setEditing({ row: null, field: null })}
                      inputProps={{ style: { color: "black" } }}
                    />
                  ) : (
                    t.owner
                  )}
                </TableCell>

                {/* Status */}
                <TableCell
                  onClick={() => setEditing({ row: idx, field: "status" })}
                >
                  {editing.row === idx && editing.field === "status" ? (
                    <Select
                      size="small"
                      value={t.status}
                      onChange={(e) => handleEdit(idx, "status", e.target.value)}
                      onBlur={() => setEditing({ row: null, field: null })}
                      sx={{ minWidth: 130, color: "black !important" }}
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
                <TableCell
                  onClick={() => setEditing({ row: idx, field: "type" })}
                >
                  {editing.row === idx && editing.field === "type" ? (
                    <TextField
                      size="small"
                      value={t.type}
                      autoFocus
                      onChange={(e) => handleEdit(idx, "type", e.target.value)}
                      onBlur={() => setEditing({ row: null, field: null })}
                      inputProps={{ style: { color: "black" } }}
                    />
                  ) : (
                    t.type
                  )}
                </TableCell>

                {/* SP */}
                <TableCell
                  onClick={() => setEditing({ row: idx, field: "sp" })}
                >
                  {editing.row === idx && editing.field === "sp" ? (
                    <TextField
                      size="small"
                      type="number"
                      value={t.sp}
                      autoFocus
                      onChange={(e) => handleEdit(idx, "sp", e.target.value)}
                      onBlur={() => setEditing({ row: null, field: null })}
                      inputProps={{ style: { color: "black" } }}
                    />
                  ) : (
                    t.sp
                  )}
                </TableCell>

                {/* Delete */}
                <TableCell>
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => handleDeleteTask(idx)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {/* New Task Row (auto save on blur of SP field) */}
            <TableRow>
              <TableCell>
                <TextField
                  size="small"
                  placeholder="Task name"
                  value={newTask.task}
                  onChange={(e) => setNewTask({ ...newTask, task: e.target.value })}
                  inputProps={{ style: { color: "black" } }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  size="small"
                  placeholder="Owner"
                  value={newTask.owner}
                  onChange={(e) => setNewTask({ ...newTask, owner: e.target.value })}
                  inputProps={{ style: { color: "black" } }}
                />
              </TableCell>
              <TableCell>
                <Select
                  size="small"
                  value={newTask.status}
                  onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                  sx={{ minWidth: 130, color: "black !important" }}
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
                  onBlur={handleSaveNewTask}
                  inputProps={{ style: { color: "black" } }}
                />
              </TableCell>
              <TableCell>—</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
