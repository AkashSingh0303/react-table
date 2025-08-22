import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import TableBoard from '../components/TableBoard/TableBoard';

function TablePage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box mb={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Project Tasks
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          A simple Monday.com-style task table with inline editing
        </Typography>
      </Box>

      <TableBoard />
    </Container>
  );
}

export default TablePage;