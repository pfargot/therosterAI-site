import React from 'react';
import { Box, Typography, Card, CardContent, Chip } from '@mui/material';

const Insights: React.FC = () => {
  const insights = [
    {
      title: 'Green Flag Pattern',
      content: 'Prospects with more green flags than red flags tend to stick around longer.',
      type: 'pattern',
      confidence: 'High',
    },
    {
      title: 'Your Type',
      content: 'Your type seems to always have travel interest in common.',
      type: 'trend',
      confidence: 'Medium',
    },
    {
      title: 'Chemistry Indicator',
      content: 'You have better chemistry with people who share your sense of humor.',
      type: 'insight',
      confidence: 'High',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        AI Insights
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Discover patterns and insights about your dating preferences
      </Typography>

      <Box sx={{ display: 'grid', gap: 3 }}>
        {insights.map((insight, index) => (
          <Card key={index}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Typography variant="h6">{insight.title}</Typography>
                <Chip 
                  label={insight.confidence} 
                  size="small" 
                  color={insight.confidence === 'High' ? 'success' : 'warning'} 
                />
              </Box>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {insight.content}
              </Typography>
              <Chip label={insight.type} size="small" variant="outlined" />
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Insights; 