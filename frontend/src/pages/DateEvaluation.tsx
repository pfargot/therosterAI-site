import React from 'react';
import { Box, Typography, Paper, Container } from '@mui/material';

const DateEvaluation: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Date Evaluation
        </Typography>
        <Paper sx={{ p: 3 }}>
          <Typography variant="body1">
            This is where you'll evaluate your dates and add them to your roster.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default DateEvaluation; 