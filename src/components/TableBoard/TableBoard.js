import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Button
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import TableRowItem from './TableRowItem';
import { initialData } from './tableData';

function TableBoard() {
  const [rows, setRows] = useState(initialData);

  const handleAddRow = () => {
    const newRow = {
      id: rows.length + 1,
      name: 'New Task',
      owner: 'Unassigned',
      status: 'Working on it',
      priority: 'Medium',
      dueDate: null,
      tags: []
    };
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = (id) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const handleUpdateRow = (id, field, value) => {
    setRows(rows.map(row =>
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Button
        startIcon={<Add />}
        onClick={handleAddRow}
        sx={{ m: 2 }}
        variant="contained"
      >
        Add Row
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Task</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Tags</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map(row => (
            <TableRowItem
              key={row.id}
              row={row}
              onDelete={handleDeleteRow}
              onUpdate={handleUpdateRow}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableBoard;
