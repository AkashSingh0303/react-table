import React from 'react';
import { TableRow, TableCell, IconButton, TextField, Chip } from '@mui/material';
import { Delete } from '@mui/icons-material';

function TableRowItem({ row, onDelete, onUpdate }) {
  return (
    <TableRow>
      <TableCell>
        <TextField
          value={row.name}
          variant="standard"
          onChange={(e) => onUpdate(row.id, 'name', e.target.value)}
        />
      </TableCell>
      <TableCell>
        <TextField
          value={row.owner}
          variant="standard"
          onChange={(e) => onUpdate(row.id, 'owner', e.target.value)}
        />
      </TableCell>
      <TableCell>
        <Chip
          label={row.status}
          color={row.status === 'Done' ? 'success' : row.status === 'Stuck' ? 'error' : 'warning'}
          onClick={() =>
            onUpdate(row.id, 'status',
              row.status === 'Working on it' ? 'Done' :
              row.status === 'Done' ? 'Stuck' : 'Working on it'
            )
          }
        />
      </TableCell>
      <TableCell>
        <Chip
          label={row.priority}
          color={row.priority === 'High' ? 'error' : row.priority === 'Low' ? 'info' : 'default'}
          onClick={() =>
            onUpdate(row.id, 'priority',
              row.priority === 'Low' ? 'Medium' :
              row.priority === 'Medium' ? 'High' : 'Low'
            )
          }
        />
      </TableCell>
      <TableCell>
        <TextField
          type="date"
          value={row.dueDate || ''}
          variant="standard"
          onChange={(e) => onUpdate(row.id, 'dueDate', e.target.value)}
        />
      </TableCell>
      <TableCell>
        {row.tags.map((tag, i) => (
          <Chip
            key={i}
            label={tag}
            size="small"
            onDelete={() =>
              onUpdate(row.id, 'tags', row.tags.filter((t) => t !== tag))
            }
            sx={{ mr: 0.5 }}
          />
        ))}
        <Chip
          label="+"
          size="small"
          onClick={() => onUpdate(row.id, 'tags', [...row.tags, 'New Tag'])}
        />
      </TableCell>
      <TableCell align="center">
        <IconButton color="error" onClick={() => onDelete(row.id)}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default TableRowItem;
